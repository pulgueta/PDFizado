import { useEffect, useState } from 'react';

import { initializePaddle, type Paddle } from '@paddle/paddle-js';
import { env } from '~/env/client.mjs';

export const usePaddle = () => {
	const [paddle, setPaddle] = useState<Paddle>();

	useEffect(() => {
		initializePaddle({
			token: env.NEXT_PUBLIC_PADDLE_CLIENT,
			environment:
				process.env.NODE_ENV === 'development'
					? 'sandbox'
					: 'production',
		}).then((paddleInstance: Paddle | undefined) => {
			if (paddleInstance) {
				setPaddle(paddleInstance);
			}
		});
	}, []);

	return { paddle };
};
