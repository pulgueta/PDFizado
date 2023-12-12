import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ReactQueryProvider } from '~/providers/tanstack-provider';
import { auth } from '~/lib/auth';

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

const DashboardLayout = async ({ children }: PropsWithChildren) => {
	const session = await auth();

	if (!session) {
		redirect('/login');
	}

	return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default DashboardLayout;
