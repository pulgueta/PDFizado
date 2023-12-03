'use client';

import { Button } from '~/shadcn/button';
import { env } from '~/env';

export const UpgradeButton = () => {
	const body = {
		reason: 'PDFizado - Plan estándar',
		auto_recurring: {
			frequency: 1,
			frequency_type: 'months',
			transaction_amount: 25000,
			currency_id: 'COP',
		},
		back_url: `${env.BASE_URL}/dashboard/plan`,
		payer_email: 'test_user_538458526@testuser.com',
	};

	const onStandard = async () => {
		const res = await fetch('https://api.mercadopago.com/preapproval', {
			method: 'POST',
			body: JSON.stringify({ body }),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.MERCADOPAGO_DEV_SECRET}`,
			},
		})
			.then((res) => {
				res.json();
			})
			.catch((err) => {
				console.log(err);
			});

		console.log(res);
	};

	// const professional =
	// 	'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848c2cfc6a018c2de3ffb3005e';

	return (
		<>
			<Button className='w-full md:w-auto' onClick={onStandard}>
				Actualizar a estándar
			</Button>
			{/* <Button
				className='w-full md:w-auto'
				onClick={() => (window.location.href = professional)}
			>
				Actualizar a profesional
			</Button> */}
		</>
	);
};
