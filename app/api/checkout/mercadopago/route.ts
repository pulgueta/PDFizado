import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/env';
import { auth } from '~/lib/auth';

export const POST = async (req: NextRequest) => {
	const session = await auth();

	const _body = await req.json();

	const body = {
		reason: `PDFizado - Plan ${
			_body === 'standard' ? 'estándar' : 'profesional'
		}`,
		auto_recurring: {
			frequency: 1,
			frequency_type: 'months',
			transaction_amount: _body === 'standard' ? 25000 : 50000,
			currency_id: 'COP',
		},
		back_url:
			process.env.NODE_ENV === 'development'
				? 'https://3mx9jhl1-3000.use2.devtunnels.ms/dashboard/plan'
				: 'https://pdfizado.com/dashboard/plan',
		payer_email:
			process.env.NODE_ENV === 'development'
				? 'test_user_398545683@testuser.com'
				: session?.user.email,
	};

	try {
		const res = await fetch('https://api.mercadopago.com/preapproval', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.MERCADOPAGO_SECRET}`,
			},
		}).then((res) => res.json());

		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(error, {
			status: 500,
			statusText: error as string,
		});
	}
};
