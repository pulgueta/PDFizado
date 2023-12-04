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

		switch (res.status) {
			case 'pending':
				console.log('user is paying the subscription');
				break;
			case 'authorized':
				console.log('user paid -- upgrading plan');
				break;
			case 'cancelled':
				console.log(
					'user cancelled the subscription -- downgrading plan'
				);
				break;
		}
	}

	return NextResponse.json(body, { status: 200 });
};
