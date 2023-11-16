'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Layout } from '~/types';

const queryClient = new QueryClient();

const ReactQueryProvider: React.FC<Layout> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
export default ReactQueryProvider;
