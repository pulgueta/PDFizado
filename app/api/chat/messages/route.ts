import { NextRequest, NextResponse } from 'next/server';

import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	const { fileId } = body;

	console.log('route', fileId);

	const user = await currentUser();

	try {
		const messages = await db.message.findMany({
			where: {
				fileId,
				userId: user?.id,
			},
		});
		console.log(messages);
		return NextResponse.json(messages, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
};
