import { getPaidSubscriptions } from '~/lib/products/get-plans';
import { LemonSqueezyButtons } from './lemon-squeezy-buttons';
import { PaddleButtons } from './paddle-buttons';
import { currentUser } from '~/lib/auth/currentUser';

export const PayButton = async () => {
	const plansPromise = getPaidSubscriptions();
	const userPromise = currentUser();

	const [user, plans] = await Promise.all([userPromise, plansPromise]);

	const isColombia =
		Intl.DateTimeFormat().resolvedOptions().timeZone === 'America/Bogota';

	return isColombia ? (
		<LemonSqueezyButtons user={user} plans={plans} />
	) : (
		<PaddleButtons user={user} plans={plans} />
	);
};
