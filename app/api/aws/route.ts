import { type NextRequest, NextResponse } from 'next/server';

import { type Session, getServerSession } from 'next-auth';

import { authOptions } from '~/lib/auth';
import { loadAWStoPinecone } from '~/lib/pinecone';
import { db } from '~/database/db';
import { awsSchema } from '~/schemas';

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST')
        return new NextResponse('Method not allowed', { status: 405 });

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
        return NextResponse.json({ error }, { status: 500 });
    }
};
