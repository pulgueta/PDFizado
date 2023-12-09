import { createEnv } from '@t3-oss/env-nextjs';
import { ZodError, z } from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_S3_PUBLIC: z.string().min(4),
		NEXT_PUBLIC_S3_SECRET: z.string().min(4),
		NEXT_PUBLIC_S3_BUCKET: z.string().min(4),
		NEXT_PUBLIC_S3_REGION: z.string().min(4),
		NEXT_PUBLIC_MERCADOPAGO_PUBLIC: z.string().min(8),
		NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().min(8),
	},
	runtimeEnv: {
		NEXT_PUBLIC_S3_PUBLIC: process.env.NEXT_PUBLIC_S3_PUBLIC,
		NEXT_PUBLIC_S3_SECRET: process.env.NEXT_PUBLIC_S3_SECRET,
		NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET,
		NEXT_PUBLIC_S3_REGION: process.env.NEXT_PUBLIC_S3_REGION,
		NEXT_PUBLIC_MERCADOPAGO_PUBLIC: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC,
		NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
	},
	onValidationError: (error = ZodError) => {
		console.error(
			'[*] Invalid ENV variables:',
			error.flatten().fieldErrors
		);

		throw new Error('[*] Invalid environment varibales');
	},
});
