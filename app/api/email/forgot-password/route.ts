import { NextRequest, NextResponse } from 'next/server';

import { Resend } from 'resend';
import { User } from '@prisma/client';

import { db } from '~/database/db';
import { ResetPasswordEmail } from '~/emails/forgot-password';
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

	const isUserCreated = (await db.user.findUnique({
		where: {
			email,
		},
	})) as User;

	if (!isUserCreated) {
		return NextResponse.json(
			{
				message: 'No user was found',
			},
			{ status: 404 }
		);
	}

	const { token } = await fetch(
		process.env.NODE_ENV === 'development'
			? `http://localhost:3000/api/email/forgot-password/token/${isUserCreated.id}`
			: `https://www.pdfizado.com/api/email/forgot-password/token/${isUserCreated.id}`,
		{
			method: 'POST',
			body: JSON.stringify({ id: isUserCreated.id }),
		}
	).then((res) => res.json());

	try {
		const { data, error } = await resend.send({
			from: 'PDFizado <onboarding@resend.dev>',
			to: [isUserCreated.email ?? ''],
			subject: 'PDFizado - Recuperación de contraseña',
			react: ResetPasswordEmail({
				resetLink:
					process.env.NODE_ENV === 'development'
						? `http://localhost:3000/reset-password?token=${token}`
						: `https://www.pdfizado.com/reset-password?token=${token}`,
				username: isUserCreated.name ?? '',
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
