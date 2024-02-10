import { Pinecone } from '@pinecone-database/pinecone';

import { env } from '~/env/server.mjs';

const pineconeClient = () =>
	new Pinecone({
		apiKey: env.PINECONE_API_KEY,
		environment: env.PINECONE_ENVIRONMENT,
	});

export const pinecone = pineconeClient();
export const index = pinecone.index(env.PINECONE_INDEX);
