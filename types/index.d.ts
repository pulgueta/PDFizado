import { z } from 'zod';
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

export type Env = {
	[key: string]: string;
};

export type Register = z.infer<typeof registerSchema>;

export type Login = z.infer<typeof loginSchema>;

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export type ResetPassword = z.infer<typeof resetSchema>;

export type MercadoPagoAnswer = {
	additional_info: string;
	auto_return: string;
	back_urls: Urls;
	binary_mode: boolean;
	client_id: string;
	collector_id: number;
	coupon_code: null;
	coupon_labels: null;
	date_created: Date;
	date_of_expiration: null;
	expiration_date_from: null;
	expiration_date_to: null;
	expires: boolean;
	external_reference: string;
	id: string;
	init_point: string;
	internal_metadata: null;
	items: Item[];
	marketplace: string;
	marketplace_fee: number;
	metadata: Metadata;
	notification_url: null;
	operation_type: string;
	payer: Payer;
	payment_methods: PaymentMethods;
	processing_modes: null;
	product_id: null;
	redirect_urls: Urls;
	sandbox_init_point: string;
	site_id: string;
	shipments: Shipments;
	total_amount: null;
	last_updated: null;
	api_response: APIResponse;
};

export type APIResponse = {
	status: number;
	headers: { [key: string]: string[] };
};

export type Urls = {
	failure: string;
	pending: string;
	success: string;
};

export type Item = {
	id: string;
	category_id: string;
	currency_id: string;
	description: string;
	title: string;
	quantity: number;
	unit_price: number;
};

export type Metadata = {};

export type Payer = {
	phone: Phone;
	address: Address;
	email: string;
	identification: Identification;
	name: string;
	surname: string;
	date_created: null;
	last_purchase: null;
};

export type Address = {
	zip_code: string;
	street_name: string;
	street_number: null;
};

export type Identification = {
	number: string;
	type: string;
};

export type Phone = {
	area_code: string;
	number: string;
};

export type PaymentMethods = {
	default_card_id: null;
	default_payment_method_id: null;
	excluded_payment_methods: ExcludedPayment[];
	excluded_payment_types: ExcludedPayment[];
	installments: number;
	default_installments: null;
};

export type ExcludedPayment = {
	id: string;
};

export type Shipments = {
	default_shipping_method: null;
	receiver_address: ReceiverAddress;
};

export type ReceiverAddress = {
	zip_code: string;
	street_name: string;
	street_number: null;
	floor: string;
	apartment: string;
	city_name: null;
	state_name: null;
	country_name: null;
};

export type BrickResponse = {
	token: string;
	issuer_id: string;
	payment_method_id: string;
	transaction_amount: number;
	installments: number;
	payer: Payer;
};

export type Payer = {
	email: string;
	identification: Identification;
};

export type Identification = {
	type: string;
	number: string;
};
