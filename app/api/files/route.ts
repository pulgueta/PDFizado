import { type NextRequest, NextResponse } from 'next/server';

import { type Session, getServerSession } from 'next-auth';

import { db } from '~/database/db';
import { authOptions } from '~/lib/auth';
import { env } from '~/env';
import { loadAWStoPinecone } from '~/lib/pinecone';
import { awsSchema } from '~/schemas';
import { s3 } from '~/lib/aws/s3.config';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const validatedBody = awsSchema.safeParse(body);

    if (!validatedBody.success)
        return NextResponse.json(validatedBody.error.errors, { status: 400 });

    const { key, name, url } = body;

    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await loadAWStoPinecone(key);

        const file = await db.file.create({
            data: {
                awsKey: key,
                name,
                url,
                userId: session.user.id,
            },
        });

        return NextResponse.json(file, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
};

export const GET = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    try {
        const files = await db.file.findMany({
            where: {
                userId: session?.user.id,
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

    const session = (await getServerSession(authOptions)) as Session | null;

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

        if (file.userId !== session?.user.id) {
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
                userId: session?.user.id,
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
