import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/env';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    console.log(body.email);

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: 'PDFizado <onboarding@resend.dev>',
            to: [body.email],
            subject: 'Recuperación de contraseña',
            html: '<strong>it works!</strong>',
        }),
    });

    console.log(res);

    return NextResponse.json(res);
};
