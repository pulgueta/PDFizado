import { NextRequest, NextResponse } from 'next/server';

import { compare } from 'bcrypt';
import { User } from '@prisma/client';

import { db } from '~/database/db';
import { loginSchema } from '~/schemas';

export const POST = async (req: NextRequest) => {
	if (req.method !== 'POST')
		return NextResponse.json('Method not allowed', { status: 405 });

	const body = await req.json();
	const validatedBody = loginSchema.safeParse(body);

	if (!validatedBody.success) {
		return NextResponse.json(validatedBody.error.errors, { status: 400 });
	}

	const { email, password } = body;

	const { password: userPassword, ...rest } = (await db.user.findUnique({
		where: {
			email,
		},
	})) as User;

	if (!rest.emailVerified) {
		return NextResponse.json('Email not verified', { status: 401 });
	}

	if (rest && (await compare(password, userPassword))) {
		return NextResponse.json(rest, { status: 200 });
	} else {
		return NextResponse.json('Invalid credentials', { status: 401 });
	}
};
