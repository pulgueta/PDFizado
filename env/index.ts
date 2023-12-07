import { Env } from '~/types';

export const env: Env = {
	DATABASE_URL: process.env.DATABASE_URL ?? '',
	DIRECT_URL: process.env.DIRECT_URL ?? '',
	GOOGLE_PUBLIC_ID: process.env.GOOGLE_PUBLIC_ID ?? '',
	GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID ?? '',
	AUTH_SECRET: process.env.AUTH_SECRET ?? '',
	AUTH_URL: process.env.AUTH_URL ?? '',
	NEXT_PUBLIC_MERCADOPAGO_PUBLIC:
		process.env.NODE_ENV === 'development'
			? process.env.NEXT_PUBLIC_MERCADOPAGO_DEV_PUBLIC ?? ''
			: process.env.NEXT_PUBLIC_MERCADOPAGO_PROD_PUBLIC ?? '',
	MERCADOPAGO_SECRET:
		process.env.NODE_ENV === 'development'
			? process.env.MERCADOPAGO_DEV_SECRET ?? ''
			: process.env.MERCADOPAGO_PROD_SECRET ?? '',
	NEXT_PUBLIC_S3_PUBLIC: process.env.NEXT_PUBLIC_S3_PUBLIC ?? '',
	NEXT_PUBLIC_S3_REGION: process.env.NEXT_PUBLIC_S3_REGION ?? '',
	NEXT_PUBLIC_S3_SECRET: process.env.NEXT_PUBLIC_S3_SECRET ?? '',
	NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET ?? '',
	PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT ?? '',
	PINECONE_API_KEY: process.env.PINECONE_API_KEY ?? '',
	PINECONE_REGION: process.env.PINECONE_REGION ?? '',
	PINECONE_INDEX: process.env.PINECONE_INDEX ?? '',
	OPENAI_SECRET: process.env.OPENAI_SECRET ?? '',
	OPENAI_ORG: process.env.OPENAI_ORG ?? '',
	RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
	BASE_URL: process.env.BASE_URL ?? '',
};
