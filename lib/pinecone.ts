import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import { env } from '~/env';
import { downloadFromS3 } from '~/lib/aws/awsS3-server';

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

    await PineconeStore.fromDocuments(pages, embeddings, {
        pineconeIndex: index,
    });
};
