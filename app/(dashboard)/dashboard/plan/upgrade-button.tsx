'use client';

import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import {
	ICardPaymentBrickPayer,
	ICardPaymentFormData,
} from '@mercadopago/sdk-react/bricks/cardPayment/type';

import { Button } from '~/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/shadcn/dialog';
import { env } from '~/env';

export const UpgradeButton = () => {
	initMercadoPago(env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC, {
		locale: 'es-CO',
		advancedFraudPrevention: true,
		trackingDisabled: true,
		frontEndStack: 'react',
	});

	const initialization = {
		amount: 50000,
	};

	const customization = {
		visual: {
			style: {
				customVariables: {
					baseColor: '#e11d48',
					baseColorSecondVariant: '#ba163a',
				},
			},
		},
		paymentMethods: {
			minInstallments: 1,
			maxInstallments: 12,
		},
	};

	const onSubmit = async (
		formData: ICardPaymentFormData<ICardPaymentBrickPayer>
	) => {
		try {
			const res = await fetch('/api/checkout/mercadopago', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}).then((data) => data.json());

			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const standard =
		'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848bebed70018c2bc56b982b16';

	const professional =
		'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848bebedbc018c2b6393712b57';

	return (
		<>
			<Button
				className='w-full md:w-auto'
				onClick={() => (window.location.href = standard)}
			>
				Actualizar a estándar
			</Button>
			<Button
				className='w-full md:w-auto'
				onClick={() => (window.location.href = professional)}
			>
				Actualizar a profesional
			</Button>
		</>
		// <Dialog>
		// 	<DialogTrigger asChild>
		// 		<Button>Actualizar plan</Button>
		// 	</DialogTrigger>
		// 	<DialogContent className='max-h-[75vh] max-w-sm overflow-y-scroll rounded-xl md:max-h-full md:max-w-lg md:overflow-auto lg:max-w-xl'>
		// 		<DialogHeader>
		// 			<DialogTitle>Actualizar suscripción</DialogTitle>
		// 		</DialogHeader>
		// 		<CardPayment
		// 			locale='es-CO'
		// 			customization={customization}
		// 			initialization={initialization}
		// 			onSubmit={onSubmit}
		// 		/>
		// 	</DialogContent>
		// </Dialog>
	);
};
