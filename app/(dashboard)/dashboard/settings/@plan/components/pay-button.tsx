'use client';

import { FC, useEffect, useState } from 'react';

import { PaidSubscriptionPlans } from '~/lib/products/get-plans';
import { LemonSqueezyButtons } from './lemon-squeezy-buttons';
import { PaddleButtons } from './paddle-buttons';
import { CurrentUser } from '~/lib/auth/currentUser';
import { env } from '~/env/client.mjs';
import { FetchCountry } from './types';

type $PayButton = {
	user: CurrentUser;
	plans: PaidSubscriptionPlans;
};

export const PayButton: FC<$PayButton> = ({ plans, user }) => {
	const [country, setCountry] = useState<FetchCountry>();

	useEffect(() => {
		fetch(
			`https://api.geoapify.com/v1/ipinfo?apiKey=${env.NEXT_PUBLIC_GEOLOCATION}`
		)
			.then((response) => response.json())
			.then((res) => setCountry(res));
	}, []);

	console.log(country?.country);

	const isColombia = country?.country.iso_code === 'CO';

	return isColombia ? (
		<LemonSqueezyButtons user={user} plans={plans} />
	) : (
		<PaddleButtons plans={plans} user={user} />
	);
};
