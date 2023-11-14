import { NextRequest } from 'next/server';

import { Session, getServerSession } from 'next-auth';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

import { env } from '~/env';
import { authOptions } from '~/lib/auth';
import { plan as Plan } from '~/lib/plan-allowance';

const config = new Configuration({
    apiKey: env.OPENAI_SECRET,
    organization: env.OPENAI_ORG,
});

const gpt = new OpenAIApi(config);

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const session = (await getServerSession(authOptions)) as Session | null;

    try {
        const response = await gpt.createChatCompletion({
            model: Plan(session?.user.plan || 'FREE'),
            messages: body.messages,
            stream: true,
        });

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream);
    } catch (error) {}
};
