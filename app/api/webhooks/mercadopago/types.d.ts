export type Webhook = {
	action: string;
	application_id: number;
	data: Data;
	date: Date;
	entity: string;
	id: number;
	type: string;
	version: number;
};

type Data = { id: string };

export type Subscription = {
	id: string;
	payer_id: number;
	payer_email: string;
	back_url: URL;
	collector_id: number;
	application_id: number;
	status: SubscriptionStatus;
	reason: string;
	date_created: Date;
	last_modified: Date;
	auto_recurring: AutoRecurring;
	summarized: Summarized;
	payment_method_id: string;
	first_invoice_offset: null;
};

type SubscriptionStatus = 'pending' | 'authorized' | 'paused' | 'cancelled';

type Currency = 'COP' | 'ARS' | 'CLP' | 'MXN' | 'PEN' | 'UYU' | 'BRL';

type AutoRecurring = {
	frequency: number;
	frequency_type: 'days' | 'months';
	transaction_amount: number;
	currency_id: Currency;
	free_trial: null;
};

type Summarized = {
	quotas: number | null;
	charged_quantity: number | null;
	pending_charge_quantity: number | null;
	charged_amount: number | null;
	pending_charge_amount: number | null;
	semaphore: number | null;
	last_charged_date: Date;
	last_charged_amount: number | null;
};
