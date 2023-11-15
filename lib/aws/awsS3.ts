import { S3 } from '@aws-sdk/client-s3';

import { env } from '~/env';

export const uploadToS3 = async (file: File) => {
    try {
        const s3 = new S3({
            credentials: {
                accessKeyId: env.NEXT_PUBLIC_S3_PUBLIC,
                secretAccessKey: env.NEXT_PUBLIC_S3_SECRET,
            },
            region: env.NEXT_PUBLIC_S3_REGION,
        });

        const key = `uploads/${Date.now().toString()}-${file.name.replace(
            /\s/g,
            '-'
        )}`;

        const params = {
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
