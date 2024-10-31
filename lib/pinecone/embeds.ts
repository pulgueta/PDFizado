import { embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { env } from '~/env/server.mjs';

export const getEmbeddings = async (text: string) => {
	const oai = createOpenAI({
		apiKey: env.OPENAI_SECRET,
	});

	try {
		const res = await embed({
			model: oai.embedding('text-embedding-3-large'),
			value: text.replace(/\n/g, ' '),
		});

		return res.embedding.map((e) => e);
	} catch (error) {
		console.log('error calling openai embeddings api', error);
		throw error;
	}
};
