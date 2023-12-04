import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/env';

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	console.log('webhook', body);

	if (body.data.id) {
		const res = await fetch(
			`https://api.mercadopago.com/preapproval/${body.data.id}`,
			{
				headers: {
					Authorization: `Bearer ${env.MERCADOPAGO_SECRET}`,
				},
			}
		).then((res) => res.json());

		console.log('subscription status', res);

		if (res.status === 'authorized') {
			console.log('upgrading subscription to pro');
		}

		if (res.status === 'cancelled') {
			console.log('downgrading to free tier');
		}
	}

	return NextResponse.json(body, { status: 200 });
};
