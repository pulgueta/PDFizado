'use client';

import { FC } from 'react';

import { PaidSubscriptionPlans } from '~/lib/products/get-plans';
import { LemonSqueezyButtons } from './lemon-squeezy-buttons';
import { PaddleButtons } from './paddle-buttons';
import { CurrentUser } from '~/lib/auth/currentUser';
import { useCountry } from '~/hooks/use-country';

type $PayButton = {
	user: CurrentUser;
	plans: PaidSubscriptionPlans;
};

export const PayButton: FC<$PayButton> = ({ plans, user }) => {
	const country = useCountry();

	const isColombia = country?.country.iso_code === 'CO';

	return isColombia ? (
		<LemonSqueezyButtons user={user} plans={plans} />
	) : (
		<PaddleButtons plans={plans} user={user} />
	);
};
