import { createEnv } from '@t3-oss/env-nextjs';
import { ZodError, z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		AUTH_URL: z.string().url(),
		AUTH_SECRET: z.string().min(8),
		MERCADOPAGO_SECRET: z.string().min(8),
		PINECONE_ENVIRONMENT: z.string().min(4),
		PINECONE_API_KEY: z.string().min(4),
		PINECONE_REGION: z.string().min(4),
		PINECONE_INDEX: z.string().min(4),
		OPENAI_SECRET: z.string().min(8),
		OPENAI_ORG: z.string().min(8),
		RESEND_API_KEY: z.string().min(8),
		BASE_URL: z.string().url()
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		AUTH_URL: process.env.AUTH_URL,
		AUTH_SECRET: process.env.AUTH_SECRET,
		MERCADOPAGO_SECRET: process.env.MERCADOPAGO_SECRET,
		PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
		PINECONE_API_KEY: process.env.PINECONE_API_KEY,
		PINECONE_REGION: process.env.PINECONE_REGION,
		PINECONE_INDEX: process.env.PINECONE_INDEX,
		OPENAI_SECRET: process.env.OPENAI_SECRET,
		OPENAI_ORG: process.env.OPENAI_ORG,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		BASE_URL: process.env.BASE_URL,
	},
	onValidationError: (error = ZodError) => {
		console.error(
			'[*] Invalid ENV variables:',
			error.flatten().fieldErrors
		);

		throw new Error('[*] Invalid environment varibales');
	},
	isServer: typeof window === 'undefined',
});