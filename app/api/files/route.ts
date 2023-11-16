import { NextRequest, NextResponse } from 'next/server';

import { type Session, getServerSession } from 'next-auth';
import { S3 } from '@aws-sdk/client-s3';

import { db } from '~/database/db';
import { authOptions } from '~/lib/auth';
import { env } from '~/env';

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

    const s3 = new S3({
        credentials: {
            accessKeyId: env.NEXT_PUBLIC_S3_PUBLIC,
            secretAccessKey: env.NEXT_PUBLIC_S3_SECRET,
        },
        region: env.NEXT_PUBLIC_S3_REGION,
    });

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

        s3.deleteObject(params);

        return NextResponse.json(
            { message: 'File deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};
