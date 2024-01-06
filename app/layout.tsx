import { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';

import { Toaster } from 'sonner';

import { ThemeProvider } from '~/providers/theme-provider';
import { ProgressProvider } from '~/providers/progress-bar';
import { Footer } from '~/components/server/footer/footer';
import { Navbar } from '~/components/server/navbar/navbar';

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
		url: 'https://pdfizado.com',
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
	metadataBase: new URL('https://pdfizado.com'),
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
				<ProgressProvider>
					<Navbar />
					<Toaster
						richColors
						closeButton
						position='top-center'
						duration={1500}
					/>
					{children}
					<Footer />
				</ProgressProvider>
			</ThemeProvider>
			<Analytics />
			<SpeedInsights />
		</body>
	</html>
);

export default RootLayout;
