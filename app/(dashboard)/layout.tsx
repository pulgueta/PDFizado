import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Navbar } from '~/components/client/navbar/logged-navbar';

export const metadata: Metadata = {
	title: 'Dashboard',
	description:
		'Este es tu perfil, donde podrás acceder a las funcionalidades de PDFizado',
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			notranslate: true,
		},
	},
};

const DashboardLayout = ({ children }: PropsWithChildren) => (
	<>
		<Navbar />
		{children}
	</>
);

export default DashboardLayout;
