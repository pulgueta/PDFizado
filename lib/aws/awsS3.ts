import { PutObjectCommandInput } from '@aws-sdk/client-s3';

import { env } from '~/env/client.mjs';
import { s3 } from './s3.config';

export const uploadToS3 = async (file: File, path: string) => {
	try {
		const key = `${path}/${Date.now().toString()}-${file.name.replace(
			/\s/g,
			'-'
		)}`;

		const params: PutObjectCommandInput = {
			Bucket: env.NEXT_PUBLIC_S3_BUCKET,
			Key: key,
			Body: file,
		};

		await s3
			.putObject(params)
			.then(() => {})
			.catch((err) => {
				return Promise.reject(err);
			});

		return Promise.resolve({
			key,
			name: file.name,
			url: getFileUrl(key),
		});
	} catch (e) {
		console.error('Error uploading to S3,', e);

		return Promise.reject(e);
	}
};

export const getFileUrl = (key: string) =>
	`https://${env.NEXT_PUBLIC_S3_BUCKET}.s3.${env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${key}`;
