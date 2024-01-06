import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import {
	Document,
	RecursiveCharacterTextSplitter,
} from '@pinecone-database/doc-splitter';

import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import md5 from 'md5';

import { env } from '~/env/server.mjs';
import { downloadFromS3 } from '~/lib/aws/awsS3-server';
import { getEmbeddings } from './embeds';

type PDFPage = {
	pageContent: string;
	metadata: {
		loc: {
			pageNumber: number;
		};
	};
};

export const pineconeIndex = new Pinecone({
	apiKey: env.PINECONE_API_KEY,
	environment: env.PINECONE_ENVIRONMENT,
}).Index(env.PINECONE_INDEX);

export const loadAWStoPinecone = async (fileKey: string) => {
	const file = await downloadFromS3(fileKey);

	if (!file) {
		throw new Error('Error downloading file from S3');
	}

	const loader = new PDFLoader(file);
	const doc = (await loader.load()) as PDFPage[];

	const documents = await Promise.all(doc.map(prepareDocument));

	const vectors = await Promise.all(documents.flat().map(embedDocument));

	await pineconeIndex.upsert(vectors);

	return documents[0];
};

export const truncate = (str: string, n: number) => {
	const encoder = new TextEncoder();

	return new TextDecoder('utf-8').decode(encoder.encode(str).slice(0, n));
};

export const embedDocument = async (doc: Document) => {
	try {
		const embeds = await getEmbeddings(doc.pageContent);
		const hash = md5(doc.pageContent);

		return {
			id: hash,
			values: embeds,
			metadata: {
				pageNumber: doc.metadata.pageNumber,
				text: doc.metadata.text,
			},
		} as PineconeRecord;
	} catch (error) {
		console.log(error);
		throw new Error('Error getting embeddings');
	}
};

export const prepareDocument = async (page: PDFPage) => {
	let { pageContent, metadata } = page;
	pageContent = pageContent.replace(/\n/g, '');

	const splitter = new RecursiveCharacterTextSplitter();
	const docs = await splitter.splitDocuments([
		new Document({
			pageContent,
			metadata: {
				pageNumber: metadata.loc.pageNumber,
				text: truncate(pageContent, 36000),
			},
		}),
	]);

	return docs;
};
