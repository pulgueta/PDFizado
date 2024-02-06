import { createEnv } from '@t3-oss/env-nextjs';
import { ZodError, string } from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_S3_PUBLIC: string().min(4),
		NEXT_PUBLIC_S3_SECRET: string().min(4),
		NEXT_PUBLIC_S3_BUCKET: string().min(4),
		NEXT_PUBLIC_S3_REGION: string().min(4),
		NEXT_PUBLIC_MERCADOPAGO_PUBLIC: string().min(8),
		NEXT_PUBLIC_PADDLE_CLIENT: string().min(8),
	},
	runtimeEnv: {
		NEXT_PUBLIC_S3_PUBLIC: process.env.NEXT_PUBLIC_S3_PUBLIC,
		NEXT_PUBLIC_S3_SECRET: process.env.NEXT_PUBLIC_S3_SECRET,
		NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET,
		NEXT_PUBLIC_S3_REGION: process.env.NEXT_PUBLIC_S3_REGION,
		NEXT_PUBLIC_MERCADOPAGO_PUBLIC: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC,
		NEXT_PUBLIC_PADDLE_CLIENT: process.env.NEXT_PUBLIC_PADDLE_CLIENT,
	},
	onValidationError: (error = ZodError) => {
		console.error(
			'[*] Invalid ENV variables:',
			error.flatten().fieldErrors
		);

		throw new Error(`[*] Invalid environment varibales: ${error.flatten().fieldErrors}`);
	},
});
