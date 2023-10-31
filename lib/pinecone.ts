import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

import { env } from '~/env';
import { downloadFromS3 } from '~/lib/awsS3-server';

type PDFPage = {
    pageContent: string;
    metadata: {
        loc: {
            pageNumber: number;
        };
    };
};

export const getPinecone = () => {
    const pinecone = new Pinecone({
        apiKey: env.PINECONE_API_KEY,
        environment: env.PINECONE_ENVIRONMENT,
    });

    if (!pinecone) {
        throw new Error('Error initializing Pinecone');
    }

    return pinecone;
};

export const loadAWStoPinecone = async (fileKey: string) => {
    const file = await downloadFromS3(fileKey);

    if (!file) {
        throw new Error('Error downloading file from S3');
    }

    const loader = new PDFLoader(file);
    const pages = (await loader.load()) as PDFPage[];

    return pages;
};

export const preparePDF = async (pdf: PDFPage) => {};
