import fs from 'node:fs';

import { S3 } from '@aws-sdk/client-s3';

import { env } from '~/env';

export const downloadFromS3 = async (file_key: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const s3 = new S3({
                credentials: {
                    accessKeyId: env.NEXT_PUBLIC_S3_PUBLIC,
                    secretAccessKey: env.NEXT_PUBLIC_S3_SECRET,
                },
                region: 'us-east-2',
            });

            const params = {
                Bucket: env.NEXT_PUBLIC_S3_BUCKET,
                Key: file_key,
            };

            const obj = await s3.getObject(params);

            const tmpDir = '/tmp';

            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }

            const file_name = `${tmpDir}/pdf-${Date.now().toString()}.pdf`;

            if (obj.Body instanceof require('stream').Readable) {
                const file = fs.createWriteStream(file_name);
                file.on('open', function (fd) {
                    // @ts-ignore
                    obj.Body?.pipe(file).on('finish', () => {
                        return resolve(file_name);
                    });
                });
            }
        } catch (error) {
            reject(error);
            return null;
        }
    });
};
