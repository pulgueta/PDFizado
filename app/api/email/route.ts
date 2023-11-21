import { NextRequest, NextResponse } from 'next/server';

import { ResetPasswordEmail } from '~/components/email/email-template';
import { env } from '~/env';
import { emailSchema } from '~/schemas';

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const validatedBody = emailSchema.safeParse(body);

	if (!validatedBody.success) {
		return NextResponse.json(validatedBody.error.errors, { status: 400 });
	}

	const { email } = body;

	try {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'PDFizado <onboarding@resend.dev>',
				to: [email],
				subject: 'PDFizado - Recuperación de contraseña',
				html: ResetPasswordEmail({
					resetLink: 'https://resend.dev',
					userName: 'John',
				}),
			}),
		});

		const data = await res.json();

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(error, { status: 500 });
	}
};
