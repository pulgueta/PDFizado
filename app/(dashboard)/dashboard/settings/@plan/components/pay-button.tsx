import IPData from 'ipdata';

import { getPaidSubscriptions } from '~/lib/products/get-plans';
import { LemonSqueezyButtons } from './lemon-squeezy-buttons';
import { PaddleButtons } from './paddle-buttons';
import { currentUser } from '~/lib/auth/currentUser';
import { env } from '~/env/server.mjs';

const { lookup } = new IPData(env.IPDATA_KEY);

export const PayButton = async () => {
	const plansPromise = getPaidSubscriptions();
	const userPromise = currentUser();
	const countryPromise = lookup();

	const [user, plans, country] = await Promise.all([
		userPromise,
		plansPromise,
		countryPromise,
	]);

	console.log(country);

	const isColombia = country.country_code === 'CO';

	return isColombia ? (
		<LemonSqueezyButtons user={user} plans={plans} />
	) : (
		<PaddleButtons plans={plans} user={user} />
	);
};
