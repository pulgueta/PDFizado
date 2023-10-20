import { NextRequest, NextResponse } from 'next/server'

import PayPal from '@paypal/checkout-server-sdk'

const env = new PayPal.core.SandboxEnvironment(process.env.NEXT_PUBLIC_DEV_PAYPAL_CLIENT_ID ?? '', process.env.DEV_PAYPAL_SECRET_ID ?? '')
const paypal = new PayPal.core.PayPalHttpClient(env)

export const POST = async (req: NextRequest) => {
    const orderRequest = new PayPal.orders.OrdersCreateRequest()

    orderRequest.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: '5.00'
                },
                description: 'Suscripción profesional para PDFizado.',

            }
        ],
    })
}