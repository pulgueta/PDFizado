import aws from 'aws-sdk';

import { env } from '@/env';

export const uploadToS3 = async (file: File) => {
    try {
        aws.config.update({
            credentials: {
                accessKeyId: env.NEXT_PUBLIC_S3_PUBLIC,
                secretAccessKey: env.NEXT_PUBLIC_S3_SECRET,
            },
        });

        const s3 = new aws.S3({
            params: {
                Bucket: env.NEXT_PUBLIC_S3_BUCKET,
            },
            region: 'us-east-1',
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

        const upload = s3
            .putObject(params)
            .on('httpUploadProgress', (progress) => {
                console.log(
                    `Uploading to S3: ${progress.loaded}/${progress.total}`
                );
            })
            .promise();

        await upload.then((data) => {
            console.log(
                `Uploaded to S3 correctly: ${data.$response.httpResponse.statusCode}`,
                key
            );
        });

        return Promise.resolve({ key, file_name: file.name });
    } catch (e) {
        console.log('Error uploading to S3', e);

        return Promise.reject(e);
    }
};

export const getFileUrl = (key: string) =>
    `https://${env.NEXT_PUBLIC_S3_BUCKET}.s3.us-east-1.amazonaws.com/${key}`;
