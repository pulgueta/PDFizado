import { NextRequest, NextResponse } from 'next/server';

import { currentUser } from '~/lib/auth/currentUser';
import { s3 } from '~/lib/aws/s3.config';
import { env } from '~/env/client.mjs';
import { db } from '~/database/db';
import { ExtendedUser, signOut } from '~/lib/auth/auth';

export const DELETE = async (req: NextRequest) => {
	const user = await currentUser();

	if (!user)
		return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

	const body = (await req.json()) as ExtendedUser;

	if (user.id !== body.id) {
		return NextResponse.json(
			{ error: 'Unauthorized to delete other user' },
			{ status: 401 }
		);
	}

	const path = user.image?.split('/')[user.image.split('/').length - 2];
	const image = user.image?.split('/')[user.image.split('/').length - 1];

	s3.deleteObject({
		Bucket: env.NEXT_PUBLIC_S3_BUCKET,
		Key: `${path}/${image}`,
	});

	const files = await db.file.findMany({
		where: {
			userId: body.id,
		},
	});

	files.map((file) =>
		s3.deleteObject({
			Bucket: env.NEXT_PUBLIC_S3_BUCKET,
			Key: file.awsKey,
		})
	);

	await db.issue.deleteMany({
		where: {
			from: body.email!,
		},
	});

	const accounts = await db.account.findFirst({
		where: {
			userId: body.id,
		},
	});

	if (accounts) {
		await db.account.deleteMany({
			where: {
				userId: body.id,
			},
		});
	}

	await db.user.delete({
		where: {
			id: body.id,
		},
	});

	await signOut({ redirectTo: '/login', redirect: true });

	return NextResponse.json({ message: 'User deleted' }, { status: 200 });
};
