import { type NextRequest, NextResponse } from 'next/server';

import { loadAWStoPinecone } from '~/lib/pinecone';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { key, name } = body;
    const pages = await loadAWStoPinecone(key);

    return NextResponse.json({ key, name, pages }, { status: 200 });
    // try {
    //     const body = await req.json();
    //     const { key, name } = body;

    //     const pages = await loadAWStoPinecone(key);

    //     console.log(pages);

    //     return NextResponse.json({ key, name }, { status: 200 });
    // } catch (error) {
    //     return NextResponse.json({ error }, { status: 500 });
    // }
};
