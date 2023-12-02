import { NextRequest, NextResponse } from 'next/server';

import { MercadoPagoConfig, Payment } from 'mercadopago';
import { PaymentCreateData } from 'mercadopago/dist/clients/payment/create/types';

import { env } from '~/env';
import { BrickResponse } from '~/types';

const client = new MercadoPagoConfig({
	accessToken: env.MERCADOPAGO_SECRET,
	options: {
		timeout: 10000,
	},
});

export const POST = async (req: NextRequest) => {
	const _body = await req.json();

	const {
		installments,
		transaction_amount,
		issuer_id,
		payment_method_id,
		payer: {
			identification: { number, type },
			email,
		},
		token,
	} = _body as BrickResponse;

	console.log('body', _body);

	const payment = new Payment(client);

	const body: PaymentCreateData = {
		body: {
			transaction_amount,
			description: 'PDFizado - Plan Profesional',
			payment_method_id,
			installments,
			issuer_id: Number(issuer_id),
			token,
			payer: {
				email,
				identification: {
					type,
					number,
				},
			},
		},
	};

	try {
		const data = await payment.create(body);

		return NextResponse.json(data);
	} catch (error) {
		console.log(error);
		return NextResponse.json(error);
	}
};
