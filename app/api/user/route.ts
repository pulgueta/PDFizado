import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const body = await req.json();

    return NextResponse.json({ body }, { status: 200 });
};
