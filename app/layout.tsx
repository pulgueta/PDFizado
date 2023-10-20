import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/providers/theme-provider'
import { AuthProvider } from '@/providers/auth-session'
import Navbar from '@/components/navbar/navbar'
import type { Layout } from '@/types'

import './globals.css'
import { Toaster } from 'sonner'
import { PaypalProvider } from '@/providers/paypal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PDFizado - Haz tu estudio más fácil',
  description: 'Una aplicación para interactuar con el contenido de tus archivos PDF y poder hacer tu estudio más sencillo.',
  openGraph: {
    title: 'PDFizado - Haz tu estudio más fácil',
    siteName: 'PDFizado',
    description: 'Una aplicación para interactuar con el contenido de tus archivos PDF y poder hacer tu estudio más sencillo.',
    url: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${process.env.VERCEL_URL ?? 'localhost:3000'}`,
    countryName: 'Colombia',
    locale: 'es_CO',
    type: 'website',
    images: {
      url: '/pdfizado.webp',
      alt: 'PDFizado - Haz tu estudio más fácil',
      width: 1200,
      height: 630,
    }
  },
  metadataBase: new URL(`http${process.env.NODE_ENV === 'production' ? 's' : ''}://${process.env.VERCEL_URL ?? 'localhost:3000'}`),
  alternates: {
    canonical: '/',
  },
  twitter: {
    creator: '@pulgueta_'
  },
  category: 'educación, AI, chat',
  creator: 'Andrés Rodríguez',
  keywords: ['educación', 'pdf', 'chat', 'chatgpt', 'información', 'resumen', 'inteligencia artificial', 'IA'],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      notranslate: false,
    }
  },
  manifest: '/manifest.json',
  icons: {
    apple: '/icon.png'
  }
}

const RootLayout: React.FC<Layout> = ({ children }) => {
  return (
    <html lang="es">
      <meta name="theme-color" content="#E11D48" />
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <AuthProvider>
            <PaypalProvider>
              <Navbar />
              <Toaster richColors />
              {children}
            </PaypalProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout