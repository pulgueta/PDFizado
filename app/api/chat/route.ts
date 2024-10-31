import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { Message } from 'ai/react';

import { model } from '~/lib/plan-allowance';
import { getContext } from '~/lib/pinecone/context';
import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';
import { env } from '~/env/server.mjs';

export const POST = async (req: NextRequest) => {
	const user = await currentUser();

	if (!user)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();

	const ai = createOpenAI({
		apiKey: env.OPENAI_SECRET,
	});

	const gpt = ai(model[user.plan]);

	const { messages, chatId, fileId } = body;

	const lastMessage = messages[messages.length - 1];
	const context = await getContext(lastMessage.content, chatId);

	const prompt = {
		role: 'system',
		content: `
            AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
            START CONTEXT BLOCK
                ${context}
            END OF CONTEXT BLOCK
            AI assistant will ONLY answer questions that are asked in the context of the conversation.
			AI assistant will ALWAYS answer within the context provided, IF THERE IS NO INFORMATION IN THE USER QUESTION, AI ASSISTANT WILL ANSWER "Sorry, that information is not included in the document." OR IN THE USER LANGUAGE. IMPORTANT
			AI assistant will ONLY answer the questions asked within the context provided by the user, if the user asks to do anything that IS NOT related to the content in the document, such as creating scripts, scrape information from a website, or things like that, AI assistant will answer "Sorry, I can't do that." in the user's language.
			AI assistant MUST pay special attention to the user's requests when asking for something, if the user's request includes words like "link" or "give me" is AI assistant responsability to check if in the context there's a link to a portfolio or a website.
			IF AI ASSISTANT DOES NOT FIND THE QUESTION RELEVANT TO THE CONTEXT, SIMPLY ASK THE USER TO ASK ANOTHER QUESTION RELATED TO THE PDF.
            If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
            AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
            AI assistant will not invent anything that is not drawn directly from the context.
            AI assistant will always answer or ask in the user language provided.
      `,
	};

	try {
		await db.message.create({
			data: {
				text: lastMessage.content,
				fileId,
				userId: user.id,
				isUserMessage: true,
			},
		});

		const { toDataStreamResponse } = await streamText({
			onFinish: async (t) => {
				await db.message.create({
					data: {
						isUserMessage: false,
						text: t.text,
						userId: user.id,
						fileId,
					},
				});
			},
			model: gpt,
			messages: [
				prompt,
				...messages.filter(
					(message: Message) => message.role === 'user'
				),
			],
			temperature: 0.3,
		});

		return toDataStreamResponse();
	} catch (error) {
		console.log('Error', error);
		return NextResponse.json({ error }, { status: 500 });
	}
};
