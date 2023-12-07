import { NextRequest, NextResponse } from 'next/server';

import { verify } from 'argon2';
import { User } from '@prisma/client';

import { db } from '~/database/db';
import { loginSchema } from '~/schemas';

export const POST = async (req: NextRequest) => {
	const body = await req.json();
	const validatedBody = loginSchema.safeParse(body);

	if (!validatedBody.success) {
		return NextResponse.json(validatedBody.error.errors, { status: 400 });
	}

	const { email, password } = validatedBody.data;

	const user = (await db.user.findUnique({
		where: {
			email,
		},
	})) as User;

	if (!user) {
		return NextResponse.json('No user was found', { status: 404 });
	}

	if (!user.emailVerified) {
		return NextResponse.json('Email not verified', { status: 401 });
	}

	if (user && (await verify(user.password, password))) {
		return NextResponse.json(user, { status: 200 });
	} else {
		return NextResponse.json('Invalid credentials', { status: 401 });
	}
};
