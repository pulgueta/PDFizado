import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { User } from '@prisma/client';
import { hash } from '@node-rs/argon2';

import { db } from '~/database/db';
import { resetSchema } from '~/schemas';

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const validatedBody = resetSchema.safeParse(body);

	if (!validatedBody.success) {
		return NextResponse.json(validatedBody.error.errors, { status: 400 });
	}

	const { password, confirmPassword, email } = validatedBody.data;
	const { token } = body;

	if (password !== confirmPassword) {
		return NextResponse.json(
			{
				message: 'Passwords do not match',
			},
			{ status: 400 }
		);
	}

	const newPassword = await hash(password ?? '');

	try {
		const { id } = (await db.user.findUnique({
			where: {
				email,
			},
		})) as User;

		await db.user.update({
			data: {
				password: newPassword,
			},
			where: {
				email,
			},
			select: {
				id: true,
				password: false,
			},
		});

		await db.verificationToken.delete({
			where: {
				token,
				identifier: `token_requested_by_${id}`,
			},
		});

		return NextResponse.redirect(new URL('/login', req.nextUrl), {
			status: 308,
		});
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{
				message: 'Something went wrong',
			},
			{ status: 500 }
		);
	}
};
