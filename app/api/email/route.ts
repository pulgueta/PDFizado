import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/env';
import { emailSchema } from '~/schemas';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const validatedBody = emailSchema.safeParse(body);

    if (!validatedBody.success) {
        return NextResponse.json(validatedBody.error.errors, { status: 400 });
    }

    const { email } = body;

    console.log(email);

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
    const data = await res.json();

    return NextResponse.json(data);
};
