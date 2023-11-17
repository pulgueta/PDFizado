import { NextRequest, NextResponse } from 'next/server';

import { type Session, getServerSession } from 'next-auth';
import { Message, OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

import { env } from '~/env';
import { authOptions } from '~/lib/auth';
import { plan as Plan } from '~/lib/plan-allowance';
import { getContext } from '~/lib/context';
import { db } from '~/database/db';

const config = new Configuration({
    apiKey: env.OPENAI_SECRET,
    organization: env.OPENAI_ORG,
});

const gpt = new OpenAIApi(config);

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const { messages, chatId } = body;

    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
            AI assistant is a big fan of Pinecone and Vercel.
            START CONTEXT BLOCK
                ${context}
            END OF CONTEXT BLOCK
            AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
            If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
            AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
            AI assistant will not invent anything that is not drawn directly from the context.
            AI assistant will always answer or ask in the user language provided.
      `,
    };

    try {
        const response = await gpt.createChatCompletion({
            model: Plan(session?.user.plan || 'FREE'),
            stream: true,
            temperature: 0,
            messages: [
                prompt,
                ...messages.filter(
                    (message: Message) => message.role === 'user'
                ),
            ],
        });

        const stream = OpenAIStream(response, {
            onStart: async () => {
                await db.message.create({
                    data: {
                        text: lastMessage.content,
                        fileId: chatId,
                        userId: session.user.id,
                        isUserMessage: true,
                    },
                });
            },
            onCompletion: async (completion) => {
                await db.message.create({
                    data: {
                        text: completion,
                        fileId: chatId,
                        userId: session.user.id,
                        isUserMessage: false,
                    },
                });
            },
        });

        return new StreamingTextResponse(stream);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};
