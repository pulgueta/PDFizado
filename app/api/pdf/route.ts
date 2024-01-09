import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { db } from '~/database/db';
import { env } from '~/env/client.mjs';
import { loadAWStoPinecone } from '~/lib/pinecone/pinecone';
import { awsSchema } from '~/schemas';
import { s3 } from '~/lib/aws/s3.config';
import { currentUser } from '~/lib/auth/currentUser';

export const POST = async (req: NextRequest) => {
	const user = await currentUser();

	if (!user)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();
	const validatedBody = awsSchema.safeParse(body);

	if (!validatedBody.success)
		return NextResponse.json(validatedBody.error.errors, { status: 400 });

	const { key, name, url } = validatedBody.data;

	try {
		await loadAWStoPinecone(key);

		const file = await db.file.create({
			data: {
				awsKey: key,
				name,
				url,
				userId: user.id,
			},
		});

		revalidatePath('/dashboard');

		return NextResponse.json(file, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
};

export const GET = async () => {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json('Unauthorized', { status: 401 });
	}

	try {
		const files = await db.file.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(files, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};

export const DELETE = async (req: NextRequest) => {
	const body = await req.json();

	const user = await currentUser();

	const params = {
		Bucket: env.NEXT_PUBLIC_S3_BUCKET,
		Key: body.key,
	};

	try {
		const file = await db.file.findUnique({
			where: {
				id: body.id,
			},
		});

		if (!file) {
			return NextResponse.json(
				{ error: 'File not found' },
				{ status: 404 }
			);
		}

		if (file.userId !== user?.id) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		await db.file.delete({
			where: {
				id: body.id,
			},
		});

		await db.message.deleteMany({
			where: {
				fileId: body.id,
				userId: user.id,
			},
		});

		s3.deleteObject(params);

		return NextResponse.json(
			{ message: 'File deleted successfully' },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
};
