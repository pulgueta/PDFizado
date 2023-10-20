import type { Metadata } from 'next'

import type { Layout } from '@/types'

export const metadata: Metadata = {
    title: 'PDFizado - Autenticación',
    description: 'Ingresa tus datos para poder acceder a las funcionalidades de PDFizado',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            notranslate: false,
        }
    },
}

const AuthLayout: React.FC<Layout> = ({ children }) => {
    return (children)
}

export default AuthLayout