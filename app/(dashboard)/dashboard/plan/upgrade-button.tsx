'use client';

import { Button } from '~/shadcn/button';
import { Subscription } from '~/types';

export const UpgradeButton = () => {
	const onUpgrade = (plan: string) => async () => {
		const res = (await fetch('/api/checkout/mercadopago', {
			method: 'POST',
			body: JSON.stringify(plan),
		}).then((res) => res.json())) as Subscription;

		// console.log(res);

		window.location.href = res.init_point;
	};

	return (
		<>
			<Button
				className='w-full md:w-auto'
				onClick={onUpgrade('standard')}
			>
				Actualizar a estándar
			</Button>

			<Button
				className='w-full md:w-auto'
				onClick={onUpgrade('professional')}
			>
				Actualizar a profesional
			</Button>
		</>
	);
};
