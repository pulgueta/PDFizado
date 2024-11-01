import { createEnv } from '@t3-oss/env-nextjs';
import { ZodError, string } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: string().url(),
		GOOGLE_PUBLIC: string().min(8),
		GOOGLE_SECRET: string().min(8),
		LEMON_SQUEEZY_SECRET: string().min(8),
		PINECONE_API_KEY: string().min(4),
		PINECONE_REGION: string().min(4),
		PINECONE_INDEX: string().min(4),
		OPENAI_SECRET: string().min(8),
		OPENAI_ORG: string().min(8),
		RESEND_API_KEY: string().min(8),
		CLOUDFRONT_HOST: string().url(),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		GOOGLE_PUBLIC: process.env.GOOGLE_PUBLIC_ID,
		GOOGLE_SECRET: process.env.GOOGLE_SECRET_ID,
		LEMON_SQUEEZY_SECRET: process.env.LEMON_SQUEEZY_SECRET,
		PINECONE_API_KEY: process.env.PINECONE_API_KEY,
		PINECONE_REGION: process.env.PINECONE_REGION,
		PINECONE_INDEX: process.env.PINECONE_INDEX,
		OPENAI_SECRET: process.env.OPENAI_SECRET,
		OPENAI_ORG: process.env.OPENAI_ORG,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		CLOUDFRONT_HOST: process.env.CLOUDFRONT_HOST,
	},
	onValidationError: (error = ZodError) => {
		console.error(error.flatten().fieldErrors)
		throw new Error('[*] Invalid environment variables', error.flatten().fieldErrors);
	},
	isServer: typeof window === 'undefined',
});
