import { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';

import { Toaster } from 'sonner';

import { ThemeProvider } from '~/providers/theme-provider';
import { AuthProvider } from '~/providers/auth-session';
import { ReactQueryProvider } from '~/providers/tanstack-provider';
import { Footer } from '~/components/server/footer/footer';
import { Navbar } from '~/components/client/navbar/navbar';

import '~/app/globals.css';

export const metadata: Metadata = {
	title: {
		template: 'PDFizado - %s',
		default: 'PDFizado - Haz tu estudio más fácil',
	},
	description:
		'Una aplicación para interactuar con el contenido de tus archivos PDF y poder hacer tu estudio más sencillo.',
	applicationName: 'PDFizado',
	publisher: 'Andrés Rodríguez',
	formatDetection: {
		email: true,
	},
	authors: [
		{
			name: 'Andrés Rodríguez',
			url: 'https://www.linkedin.com/in/and-rodr/',
		},
	],
	openGraph: {
		title: 'PDFizado - Haz tu estudio más fácil',
		siteName: 'PDFizado',
		description:
			'Una aplicación para interactuar con el contenido de tus archivos PDF y poder hacer tu estudio más sencillo.',
		url: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
			process.env.NODE_ENV === 'production'
				? 'pdfizado.com'
				: 'localhost:3000'
		}`,
		countryName: 'Colombia',
		locale: 'es_CO',
		type: 'website',
		images: {
			url: '/pdfizado.webp',
			alt: 'PDFizado - Haz tu estudio más fácil',
			width: 1200,
			height: 630,
		},
	},
	metadataBase: new URL(
		`http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
			process.env.NODE_ENV === 'production'
				? 'pdfizado.com'
				: 'localhost:3000'
		}`
	),
	alternates: {
		canonical: '/',
	},
	twitter: {
		creator: '@pulgueta_',
	},
	category: 'educación, AI, chat',
	creator: 'Andrés Rodríguez',
	keywords: [
		'educación',
		'pdf',
		'chat',
		'chatgpt',
		'información',
		'resumen',
		'inteligencia artificial',
		'IA',
	],
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			notranslate: false,
		},
	},
	manifest: '/manifest.json',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/icon-192x192.png',
		apple: '/icon-192x192.png',
	},
};

export const viewport: Viewport = {
	themeColor: [
		{
			media: '(prefers-color-scheme: dark)',
			color: '#E11D48',
		},
		{
			media: '(prefers-color-scheme: light)',
			color: '#FFFFFF',
		},
	],
	colorScheme: 'light dark',
	minimumScale: 1,
	initialScale: 1,
	maximumScale: 5,
	viewportFit: 'cover',
	userScalable: true,
	height: 'device-height',
	width: 'device-width',
};

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang='es' suppressHydrationWarning>
		<body className={`${GeistSans.variable} antialiased`}>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<AuthProvider>
					<ReactQueryProvider>
						<Navbar />
						<Toaster
							richColors
							closeButton
							position='top-center'
							duration={1500}
						/>
						{children}
						<Footer />
					</ReactQueryProvider>
				</AuthProvider>
			</ThemeProvider>
			<Analytics />
		</body>
	</html>
);

export default RootLayout;
