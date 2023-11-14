import { NextResponse } from 'next/server';

import PayPal from '@paypal/checkout-server-sdk';

import { env } from '~/env';

const environment = new PayPal.core.SandboxEnvironment(
    env.NEXT_PUBLIC_DEV_PAYPAL_CLIENT_ID,
    env.DEV_PAYPAL_SECRET_ID
);
const paypal = new PayPal.core.PayPalHttpClient(environment);

export const POST = async () => {
    const orderRequest = new PayPal.orders.OrdersCreateRequest();
    paypal.execute(orderRequest);

    orderRequest.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: '5.00',
                },
                description: 'Suscripción profesional para PDFizado.',
            },
        ],
    });

    return NextResponse.json({
        message: 'PayPal Response',
    });
};
