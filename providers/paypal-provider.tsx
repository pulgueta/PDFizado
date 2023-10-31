'use client';

import {
    PayPalScriptProvider,
    ScriptProviderProps,
} from '@paypal/react-paypal-js';

import { Layout } from '~/types';
import { env } from '~/env';

const options: ScriptProviderProps['options'] = {
    clientId: env.NEXT_PUBLIC_DEV_PAYPAL_CLIENT_ID,
    currency: 'USD',
    debug: process.env.NODE_ENV === 'development',
};

export const PaypalProvider: React.FC<Layout> = ({ children }) => (
    <PayPalScriptProvider options={options}>{children}</PayPalScriptProvider>
);
