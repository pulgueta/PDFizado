import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { SessionProvider } from 'next-auth/react';

import { ReactQueryProvider } from '~/providers/tanstack-provider';
import { auth } from '~/lib/auth/auth';

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

	return (
		<ReactQueryProvider>
			<SessionProvider session={session}>{children}</SessionProvider>
		</ReactQueryProvider>
	);
};

export default DashboardLayout;
