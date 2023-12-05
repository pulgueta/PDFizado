import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/env';
import { Subscription, Webhook } from './types';
// import { db } from '~/database/db';
// import { auth } from '~/lib/auth';

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

			switch (res.status) {
				case 'authorized':
					console.log(res.payer_email);
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
					console.log(res.payer_email);
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
