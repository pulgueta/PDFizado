import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Autenticación',
	description:
		'Ingresa tus datos para poder acceder a las funcionalidades de PDFizado',
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			notranslate: false,
		},
	},
};

const AuthLayout = ({ children }: PropsWithChildren) => children;

export default AuthLayout;
