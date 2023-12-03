import { env } from '~/env';

export const body = {
	reason: 'PDFizado - Plan estándar',
	auto_recurring: {
		frequency: 1,
		frequency_type: 'months',
		transaction_amount: 25000,
		currency_id: 'COP',
	},
	back_url: `${env.BASE_URL}/dashboard/plan`,
};
