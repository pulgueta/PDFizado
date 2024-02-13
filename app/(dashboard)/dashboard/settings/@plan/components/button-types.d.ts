import { CurrentUser } from '~/lib/auth/currentUser';
import { PaidSubscriptionPlans } from '~/lib/products/get-plans';

export type $PayButton = {
	user: CurrentUser;
	plans: PaidSubscriptionPlans;
};
