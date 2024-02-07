import ipdata from 'ipdata';

import { getPaidSubscriptions } from '~/lib/products/get-plans';
import { LemonSqueezyButtons } from './lemon-squeezy-buttons';
import { PaddleButtons } from './paddle-buttons';
import { currentUser } from '~/lib/auth/currentUser';
import { env } from '~/env/server.mjs';

const ipData = new ipdata(env.IPDATA_KEY);

export const PayButton = async () => {
	const plansPromise = getPaidSubscriptions();
	const userPromise = currentUser();
	const countryPromise = ipData.lookup();

	const [user, plans, country] = await Promise.all([
		userPromise,
		plansPromise,
		countryPromise,
	]);

	const isColombia = country.country_code === 'CO';

	return isColombia ? (
		<LemonSqueezyButtons user={user} plans={plans} />
	) : (
		<PaddleButtons plans={plans} user={user} />
	);
};
