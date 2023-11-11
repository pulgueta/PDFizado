import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { getServerSession } from 'next-auth';

import { env } from '~/env';
import { downloadFromS3 } from '~/lib/aws/awsS3-server';
import { authOptions } from './auth';
import { db } from '~/database/db';
import { User } from '@prisma/client';

type PDFPage = {
    pageContent: string;
    metadata: {
        loc: {
            pageNumber: number;
        };
    };
};

export const getPinecone = () =>
    new Pinecone({
        apiKey: env.PINECONE_API_KEY,
        environment: env.PINECONE_ENVIRONMENT,
    });

export const loadAWStoPinecone = async (fileKey: string) => {
    const file = await downloadFromS3(fileKey);
    const session = await getServerSession(authOptions);

    if (!file) {
        throw new Error('Error downloading file from S3');
    }

    const client = getPinecone();

    const index = client.Index(env.PINECONE_INDEX);

    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: env.OPENAI_SECRET,
    });

    const loader = new PDFLoader(file);
    const pages = (await loader.load()) as PDFPage[];

    const noOfPages = pages.length;

    const { plan } = (await db.user.findFirst({
        where: {
            id: session?.user.id,
        },
    })) as User;

    switch (plan) {
        case 'FREE':
            if (noOfPages > 12) {
                return Promise.reject({
                    error: 'You have exceeded the page limit for free plan',
                });
            }
        case 'STANDARD':
            if (noOfPages > 32) {
                return Promise.reject({
                    error: 'You have exceeded the page limit for standard plan',
                });
            }
        default:
            await PineconeStore.fromDocuments(pages, embeddings, {
                pineconeIndex: index,
            });
    }
};
