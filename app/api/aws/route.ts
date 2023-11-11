import { type NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';

import { authOptions } from '~/lib/auth';
import { loadAWStoPinecone } from '~/lib/pinecone';
import { db } from '~/database/db';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { key, name } = body;

    const session = getServerSession(authOptions);

    try {
        const pages = await loadAWStoPinecone(key);

        console.log('next-route', key, name, pages);

        return NextResponse.json({ pages, key, name }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
};
