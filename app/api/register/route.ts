import { NextRequest, NextResponse } from 'next/server';

import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { Resend } from 'resend';

import { db } from '~/database/db';
import { registerSchema } from '~/schemas';
import { env } from '~/env';
import VerifyEmailTemplate from '~/emails/verify-email';

const resend = new Resend(env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
	if (req.method !== 'POST')
		return new NextResponse('Method not allowed', { status: 405 });

	const body = await req.json();
	const validatedBody = registerSchema.safeParse(body);

	if (!validatedBody.success) {
		return NextResponse.json(validatedBody.error.errors, { status: 400 });
	}

	const { name, email, password } = body;

	try {
		const userExists = (await db.user.findUnique({
			where: { email },
		})) as User;

		if (userExists)
			return new NextResponse('Email is already in use', { status: 400 });

		const hashedPassword = await hash(password, 12);

		// eslint-disable-next-line no-unused-vars
		const { password: userPassword, ...rest } = (await db.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		})) as User;

		const { data, error } = await resend.emails.send({
			from: 'PDFizado <no-reply@pdfizado.com>',
			to: [email],
			subject: 'PDFizado - Verificación de correo electrónico',
			react: VerifyEmailTemplate({
				link:
					process.env.NODE_ENV === 'development'
						? `http://localhost:3000/verify?id=${rest.id}`
						: `https://www.pdfizado.com/verify?id=${rest.id}`,
			}),
		});

		if (error) {
			return NextResponse.json(error, { status: 500 });
		}

		return NextResponse.json(
			{
				message: 'User created successfully!',
				rest,
				emailId: data,
			},
			{ status: 201 }
		);
	} catch (error) {
		NextResponse.json(error, { status: 500 });
	}
};
