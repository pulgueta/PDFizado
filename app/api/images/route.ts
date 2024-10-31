import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { currentUser } from '~/lib/auth/currentUser';
import { awsSchema } from '~/schemas';
import { db } from '~/database/db';
import { update } from '~/lib/auth/auth';
import { env } from '~/env/server.mjs';

export const POST = async (req: NextRequest) => {
	const user = await currentUser();

	if (!user) return NextResponse.json('Unauthorized', { status: 401 });

	const body = await req.json();
	const validatedBody = awsSchema.safeParse(body);

	if (!validatedBody.success)
		return NextResponse.json(validatedBody.error.errors, { status: 400 });

	const { key } = validatedBody.data;

	const { image } = await db.user.update({
		data: {
			image: `${env.CLOUDFRONT_HOST}${key}`,
		},
		where: {
			email: user.email!,
			id: user.id,
		},
	});

	await update({ user: { image } });

	return NextResponse.json({ image });
};
