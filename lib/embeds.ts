import { OpenAIApi, Configuration } from 'openai-edge';

import { env } from '~/env';

const config = new Configuration({
    apiKey: env.OPENAI_SECRET,
});

const gpt = new OpenAIApi(config);

export const getEmbeddings = async (text: string) => {
    try {
        const response = await gpt.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text.replace(/\n/g, ' '),
        });

        const result = await response.json();

        return result.data[0].embedding as number[];
    } catch (error) {
        console.log('error calling openai embeddings api', error);
        throw error;
    }
};
