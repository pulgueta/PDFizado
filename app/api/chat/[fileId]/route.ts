import { NextRequest, NextResponse } from 'next/server';

import { type Session, getServerSession } from 'next-auth';

import { db } from '~/database/db';
import { authOptions } from '~/lib/auth';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { fileId } = body;

    console.log('route', fileId);

    const session = (await getServerSession(authOptions)) as Session | null;

    try {
        const messages = await db.message.findMany({
            where: {
                fileId,
                userId: session?.user.id,
            },
        });
        console.log(messages);
        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
};
