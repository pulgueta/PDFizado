import { NextResponse } from 'next/server';

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceCreateData } from 'mercadopago/dist/clients/preference/create/types';

import { env } from '~/env';

export const POST = async () => {
	const client = new MercadoPagoConfig({
		accessToken: env.MERCADOPAGO_SECRET,
		options: {
			timeout: 10000,
		},
	});

	const preference = new Preference(client);

	const body: PreferenceCreateData = {
		body: {
			items: [
				{
					id: 'pdfizado_plan_profesional',
					title: 'Plan Profesional',
					unit_price: 50000,
					quantity: 1,
					currency_id: 'COP',
				},
			],
			back_urls: {
				success: `${
					process.env.NODE_ENV === 'development'
						? env.BASE_URL
						: 'https://pdfizado.com'
				}/dashboard/plan`,
				failure: `${
					process.env.NODE_ENV === 'development'
						? env.BASE_URL
						: 'https://pdfizado.com'
				}/dashboard/plan`,
			},
			auto_return: 'approved',
			external_reference: crypto.randomUUID(),
		},
	};

	try {
		const data = await preference.create(body);

		return NextResponse.json(data);
	} catch (error) {
		console.log(error);
		return NextResponse.json(error);
	}
};
