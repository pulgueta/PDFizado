import { getPlaiceholder } from 'plaiceholder';

export const base64Img = async (url: string) => {
	try {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(
				`Failed to fetch image from CDN: ${res.status} | ${res.statusText}`
			);
		}

		const buffer = await res.arrayBuffer();

		const { base64 } = await getPlaiceholder(Buffer.from(buffer));

		return base64;
	} catch (error) {
		if (error instanceof Error) console.log(error);
	}
};
