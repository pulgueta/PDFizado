'use client';

import { PropsWithChildren } from 'react';

import {
	PayPalScriptProvider,
	ScriptProviderProps,
} from '@paypal/react-paypal-js';

import { env } from '~/env';

const options: ScriptProviderProps['options'] = {
	clientId: env.NEXT_PUBLIC_DEV_PAYPAL_CLIENT_ID,
	currency: 'USD',
	debug: process.env.NODE_ENV === 'development',
};

export const PaypalProvider = ({ children }: PropsWithChildren) => (
	<PayPalScriptProvider options={options}>{children}</PayPalScriptProvider>
);
