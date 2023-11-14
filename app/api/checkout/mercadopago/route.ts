import { NextResponse } from 'next/server';

import { MercadoPagoConfig, Payment } from 'mercadopago';

import { env } from '~/env';

export const POST = async () => {
    try {
        const mercadopago = new MercadoPagoConfig({
            accessToken: env.MERCADOPAGO_SECRET,
        });

        const payment = new Payment(mercadopago).create({
            body: {
                description: 'Teste',
                installments: 1,
                payment_method_id: '34343434',
                payer: {
                    email: 'correo@pp.com',
                },
            },
        });

        return NextResponse.json({ payment });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
};
