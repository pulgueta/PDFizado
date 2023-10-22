import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from 'sonner';
import { getServerSession } from 'next-auth';

import { ThemeProvider } from '@/providers/theme-provider';
import { AuthProvider } from '@/providers/auth-session';
import { PaypalProvider } from '@/providers/paypal-provider';
import Navbar from '@/components/navbar/navbar';
import type { Layout } from '@/types';
import Footer from '@/components/footer/footer';
import { authOptions } from '@/lib/auth';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'PDFizado - Haz tu estudio más fácil',
    description:
        'Una aplicación para interactuar con el contenido de tus archivos PDF y poder hacer tu estudio más sencillo.',
    openGraph: {
        title: 'PDFizado - Haz tu estudio más fácil',
        siteName: 'PDFizado',
        description:
            'Una aplicación para interactuar con el contenido de tus archivos PDF y poder hacer tu estudio más sencillo.',
        url: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
            process.env.VERCEL_URL ?? 'localhost:3000'
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
    metadataBase: new URL(
        `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
            process.env.VERCEL_URL ?? 'localhost:3000'
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

const RootLayout: React.FC<Layout> = async ({ children }) => {
    const user = await getServerSession(authOptions);

    return (
        <html lang='es' suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    <AuthProvider>
                        <PaypalProvider>
                            <Navbar />
                            <Toaster richColors />
                            {children}
                            {!user && <Footer />}
                        </PaypalProvider>
                    </AuthProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
};

export default RootLayout;
