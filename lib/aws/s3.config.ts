import { S3 } from '@aws-sdk/client-s3';

import { env } from '~/env/client.mjs';

export const s3 = new S3({
	credentials: {
		accessKeyId: env.NEXT_PUBLIC_S3_PUBLIC,
		secretAccessKey: env.NEXT_PUBLIC_S3_SECRET,
	},
	region: env.NEXT_PUBLIC_S3_REGION,
});
