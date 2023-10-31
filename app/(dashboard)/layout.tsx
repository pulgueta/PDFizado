import type { Metadata } from 'next';

import type { Layout } from '~/types';

export const metadata: Metadata = {
    title: 'PDFizado - Dashboard',
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

const DashboardLayout: React.FC<Layout> = ({ children }) => {
    return children;
};

export default DashboardLayout;
