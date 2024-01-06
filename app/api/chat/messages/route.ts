import { NextRequest, NextResponse } from 'next/server';
import { Message } from 'ai/react';

import { ChatCompletionResponseMessageRoleEnum } from 'openai-edge';

import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';

export const POST = async (req: NextRequest) => {
	const user = await currentUser();

	if (!user)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();

	const fileId = body;

	const messages = await db.message.findMany({
		where: {
			fileId,
			userId: user?.id,
		},
	});

	const streamedMessages: Message[] = messages.map((message) => ({
		id: message.id,
		content: message.text,
		role: message.isUserMessage
			? ChatCompletionResponseMessageRoleEnum.User
			: ChatCompletionResponseMessageRoleEnum.Assistant,
		createdAt: message.createdAt,
	}));

	return NextResponse.json(streamedMessages, { status: 200 });
};
