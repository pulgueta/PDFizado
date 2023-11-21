import { NextRequest, NextResponse } from 'next/server';

import { Resend } from 'resend';

import { ResetPasswordEmail } from '~/components/email/email-template';
import { env } from '~/env';
import { emailSchema } from '~/schemas';

const resend = new Resend(env.RESEND_API_KEY).emails;

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const validatedBody = emailSchema.safeParse(body);

	if (!validatedBody.success) {
		return NextResponse.json(validatedBody.error.errors, { status: 400 });
	}

	const { email } = body;

	try {
		const { data, error } = await resend.send({
			from: 'PDFizado <onboarding@resend.dev>',
			to: [email],
			subject: 'PDFizado - Recuperación de contraseña',
			react: ResetPasswordEmail({
				resetLink: 'https://resend.dev',
				userName: 'John',
			}),
		});

		if (error) {
			return NextResponse.json(error, { status: 500 });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(error, { status: 500 });
	}
};
