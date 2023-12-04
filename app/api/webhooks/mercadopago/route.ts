import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/env';
import { Subscription, Webhook } from './types';

export const POST = async (req: NextRequest) => {
	const body = (await req.json()) as Webhook;

	try {
		if (body.data.id) {
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

			switch (res.status) {
				case 'pending':
					console.log('user is paying the subscription');
					break;
				case 'authorized':
					console.log('user paid subscription');
					break;
				case 'cancelled':
					console.log('user cancelled the subscription');
					break;
			}
		}

		return NextResponse.json(body, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
