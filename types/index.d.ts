import { TypeOf } from 'zod';

import {
	forgotPasswordSchema,
	loginSchema,
	registerSchema,
	resetSchema,
} from '~/schemas';

export type NavbarRoutes = {
	href: string;
	label: string;
	active?: boolean;
}[];

export type Provider = 'google' | 'facebook';

export type Register = TypeOf<typeof registerSchema>;

export type Login = TypeOf<typeof loginSchema>;

export type ForgotPassword = TypeOf<typeof forgotPasswordSchema>;

export type ResetPassword = TypeOf<typeof resetSchema>;

export type Subscription = {
	id: string;
	payer_id: number;
	payer_email: string;
	back_url: string;
	collector_id: number;
	application_id: number;
	status: string;
	reason: string;
	date_created: Date;
	last_modified: Date;
	init_point: string;
	auto_recurring: AutoRecurring;
	summarized: Summarized;
	payment_method_id: null;
	first_invoice_offset: null;
};

export type AutoRecurring = {
	frequency: number;
	frequency_type: string;
	transaction_amount: number;
	currency_id: string;
	free_trial: null;
};

export type Summarized = {
	quotas: null;
	charged_quantity: null;
	pending_charge_quantity: null;
	charged_amount: null;
	pending_charge_amount: null;
	semaphore: null;
	last_charged_date: null;
	last_charged_amount: null;
};
