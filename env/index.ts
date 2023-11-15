import { Env } from '~/types';

export const env: Env = {
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    DIRECT_URL: process.env.DIRECT_URL ?? '',
    GOOGLE_PUBLIC_ID: process.env.GOOGLE_PUBLIC_ID ?? '',
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID ?? '',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? '',
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET ?? '',
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID ?? '',
    NEXT_PUBLIC_MERCADOPAGO_PUBLIC:
        process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC ?? '',
    MERCADOPAGO_SECRET: process.env.MERCADOPAGO_SECRET ?? '',
    NEXT_PUBLIC_DEV_PAYPAL_CLIENT_ID:
        process.env.NEXT_PUBLIC_DEV_PAYPAL_CLIENT_ID ?? '',
    DEV_PAYPAL_SECRET_ID: process.env.DEV_PAYPAL_SECRET_ID ?? '',
    NEXT_PUBLIC_PROD_PAYPAL_CLIENT_ID:
        process.env.NEXT_PUBLIC_PROD_PAYPAL_CLIENT_ID ?? '',
    PROD_PAYPAL_SECRET_ID: process.env.PROD_PAYPAL_SECRET_ID ?? '',
    NEXT_PUBLIC_S3_PUBLIC: process.env.NEXT_PUBLIC_S3_PUBLIC ?? '',
    NEXT_PUBLIC_S3_SECRET: process.env.NEXT_PUBLIC_S3_SECRET ?? '',
    NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET ?? '',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '',
    NEXT_PUBLIC_PINECONE_ENVIRONMENT:
        process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT ?? '',
    NEXT_PUBLIC_PINECONE_API_KEY:
        process.env.NEXT_PUBLIC_PINECONE_API_KEY ?? '',
    PINECONE_REGION: process.env.PINECONE_REGION ?? '',
    PINECONE_INDEX: process.env.PINECONE_INDEX ?? '',
    OPENAI_SECRET: process.env.OPENAI_SECRET ?? '',
    OPENAI_ORG: process.env.OPENAI_ORG ?? '',
};
