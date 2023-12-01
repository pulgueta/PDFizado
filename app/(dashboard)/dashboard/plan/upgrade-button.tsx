'use client';

import { Button } from '~/shadcn/button';
import { MercadoPagoAnswer } from '~/types';

export const UpgradeButton = () => {
	const onUpgrade = async () => {
		const res = (await fetch('/api/checkout/mercadopago', {
			method: 'POST',
		}).then((res) => res.json())) as MercadoPagoAnswer;

		window.location.href =
			process.env.NODE_ENV === 'development'
				? res.sandbox_init_point
				: res.init_point;
	};
	return <Button onClick={onUpgrade}>Actualizar a Profesional</Button>;
};
