import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/env/server.mjs';
import { Subscription, Webhook } from './types';
// import { db } from '~/database/db';

export const POST = async (req: NextRequest) => {
	const body = (await req.json()) as Webhook;

	try {
		if (body.data.id.length > 1) {
			const res = (await fetch(
				`https://api.mercadopago.com/preapproval/${body.data.id}`,
				{
					headers: {
						Authorization: `Bearer ${env.MERCADOPAGO_SECRET}`,
					},
				}
			)
				.then((res) => res.json())
				.catch((err) => console.log(err))) as Subscription;

			console.log(res);

			console.log('mercadopago email:', res.payer_email);

			switch (res.status) {
				case 'authorized':
					console.log('Upgrading subscription');
					// await db.user.update({
					// 	data: {
					// 		mercadopagoSubscriptionId: res.id,
					// 	},
					// 	where: {
					// 		email: res.payer_email,
					// 	},
					// });
					break;
				case 'cancelled':
					console.log('Downgrading subscription');
					// await db.user.update({
					// 	data: {
					// 		mercadopagoSubscriptionId: null,
					// 	},
					// 	where: {
					// 		email: res.payer_email,
					// 	},
					// });
					break;
			}
		}

		return NextResponse.json(body, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
