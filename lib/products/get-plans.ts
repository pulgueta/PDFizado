import { db } from '~/database/db';

export const getSubscriptions = async () => {
	return await db.plans.findMany({
		orderBy: {
			monthlyPrice: 'asc',
		},
	});
};

export const getPaidSubscriptions = async () => {
	return await db.plans.findMany({
		where: {
			monthlyPrice: { gte: 25000 },
		},
	});
};

export type PaidSubscriptionPlans = Awaited<
	ReturnType<typeof getPaidSubscriptions>
>;
