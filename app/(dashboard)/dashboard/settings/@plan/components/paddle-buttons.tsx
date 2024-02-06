'use client';

import { FC } from 'react';

import { usePaddle } from '~/hooks/use-paddle';
import { Button } from '~/shadcn/button';
import type { CurrentUser } from '~/lib/auth/currentUser';
import type { PaidSubscriptionPlans } from '~/lib/products/get-plans';

type Buttons = {
	user: CurrentUser;
	plans: PaidSubscriptionPlans;
};

export const PaddleButtons: FC<Buttons> = ({ plans, user }) => {
	const { paddle } = usePaddle();

	return (
		<div className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
			{plans.map((plan) => (
				<Button
					key={plan.id}
					onClick={() => {
						paddle?.Checkout.open({
							items: [
								{
									priceId: plan.paddleHref!,
									quantity: 1,
								},
							],
							settings: {
								locale: 'es',
								displayMode: 'overlay',
							},
							customer: {
								email: user?.email!,
							},
						});
					}}
				>
					Actualizar a {plan.name.toLowerCase()}
				</Button>
			))}
		</div>
	);
};
