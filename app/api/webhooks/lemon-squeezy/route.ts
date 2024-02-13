import { NextRequest, NextResponse } from 'next/server';

import { Plan } from '@prisma/client';

import { db } from '~/database/db';
import { env } from '~/env/server.mjs';
import { update } from '~/lib/auth/auth';
import { webhookPlan } from '~/lib/products/get-plans';

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	if (body.meta.event_name === 'subscription_payment_success') {
		if (body.data.attributes.status === 'paid') {
			console.log(body.data);
			const q = await fetch(
				`https://api.lemonsqueezy.com/v1/subscriptions/${body.data.attributes.subscription_id}`,
				{
					headers: {
						Authorization: `Bearer ${env.LEMON_SQUEEZY_SECRET}`,
					},
				}
			);

			if (!q.ok) {
				throw new Error('Error fetching data from Lemon Squeezy');
			}

			const res = await q.json();

			console.log(
				`Actualizando al plan: ${webhookPlan[res.data.attributes.product_name]} para ${body.data.attributes.user_email}`
			);

			await Promise.all([
				await db.user.update({
					where: {
						email: body.data.attributes.user_email,
					},
					data: {
						plan: webhookPlan[res.data.attributes.product_name],
						lemonSqueezySubscriptionId: String(
							body.data.attributes.subscription_id
						),
					},
				}),
				await update({
					user: {
						email: body.data.attributes.user_email,
						plan: webhookPlan[res.data.attributes.product_name],
					},
				}),
			]);
		}
	}

	if (body.meta.event_name === 'subscription_cancelled') {
		if (body.data.attributes.status === 'cancelled') {
			console.log(
				`Cancelando suscripción de ${body.data.attributes.user_email}`
			);

			await Promise.all([
				await db.user.update({
					where: {
						email: body.data.attributes.user_email,
					},
					data: {
						plan: 'FREE',
					},
				}),
				await update({
					user: {
						email: body.data.attributes.user_email,
						plan: Plan.FREE,
						lemonSqueezyHref: undefined,
					},
				}),
			]);
		}
	}
	return NextResponse.json(body, { status: 200 });
};
