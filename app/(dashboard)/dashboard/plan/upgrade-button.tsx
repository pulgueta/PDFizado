'use client';

import { Button } from '~/shadcn/button';
import { Subscription } from '~/types';

export const UpgradeButton = () => {
	const onUpgrade = (plan: string) => async () => {
		const res = (await fetch('/api/checkout/mercadopago', {
			method: 'POST',
			body: JSON.stringify(plan),
		}).then((res) => res.json())) as Subscription;

		window.location.href = res.init_point;
	};

	return (
		<>
			<div className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
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
			</div>
			<span className='text-sm leading-5 text-muted-foreground'>
				*Asegúrate que tu correo de MercadoPago sea el mismo que usaste
				para registrarte en PDFizado.
			</span>
		</>
	);
};
