import { createEnv } from '@t3-oss/env-nextjs';
import { ZodError, string } from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_S3_PUBLIC: string().min(4),
		NEXT_PUBLIC_S3_SECRET: string().min(4),
		NEXT_PUBLIC_S3_BUCKET: string().min(4),
		NEXT_PUBLIC_S3_REGION: string().min(4),
		NEXT_PUBLIC_PADDLE_CLIENT: string().min(8),
	},
	runtimeEnv: {
		NEXT_PUBLIC_S3_PUBLIC: process.env.NEXT_PUBLIC_S3_PUBLIC,
		NEXT_PUBLIC_S3_SECRET: process.env.NEXT_PUBLIC_S3_SECRET,
		NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET,
		NEXT_PUBLIC_S3_REGION: process.env.NEXT_PUBLIC_S3_REGION,
		NEXT_PUBLIC_PADDLE_CLIENT: process.env.NEXT_PUBLIC_PADDLE_CLIENT,
	},
	onValidationError: (error = ZodError) => {
		throw new Error(`[*] Missing environment varibales: ${error.flatten().fieldErrors}`);
	},
});
