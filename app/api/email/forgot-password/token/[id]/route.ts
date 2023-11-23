import { NextRequest, NextResponse } from 'next/server';

import { db } from '~/database/db';

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const { id } = body;

	const { token } = await db.verificationToken.create({
		data: {
			expires: new Date(Date.now() + 15 * 60 * 1000),
			identifier: `token_requested_by_${id}`,
		},
	});

	try {
		return NextResponse.json({ token }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(error, { status: 500 });
	}
};
