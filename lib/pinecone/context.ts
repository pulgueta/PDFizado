import { getEmbeddings } from './embeds';
import { index } from './pinecone.config';

type Metadata = {
	text: string;
	pageNumber: number;
};

export const getMatchesFromEmbeddings = async (
	embeddings: number[],
	fileKey: string
) => {
	try {
		const namespace = index.namespace(fileKey);

		const queryResult = await namespace.query({
			topK: 10,
			vector: embeddings,
			includeMetadata: true,
		});

		return queryResult.matches || [];
	} catch (error) {
		console.log('error querying embeddings', error);
		throw error;
	}
};

export const getContext = async (query: string, fileKey: string) => {
	const queryEmbeddings = await getEmbeddings(query);
	const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

	const qualifyingDocs = matches.filter(
		(match) => match.score && match.score > 0.6
	);

	const docs = qualifyingDocs.map(
		(match) => (match.metadata as Metadata).text
	);

	return docs.join('\n').substring(0, 3000);
};
