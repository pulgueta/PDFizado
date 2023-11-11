'use client';

import { useState } from 'react';

import { notFound, useParams } from 'next/navigation';

import { Grid } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

import { Skeleton } from '~/shadcn/skeleton';
import UploadPDF from '~/components/client/dialog/pdf/upload-pdf';

const Dashboard = () => {
    const [loading] = useState<boolean>(true);

    const params = useParams();

    const session = useSession();

    if (session.data?.user.id !== params.id) {
        notFound();
    }

    return (
        <main className='min-h-[calc(100vh-80px)]'>
            <div className='mx-auto max-w-7xl p-4'>
                <header>
                    {session.data?.user?.name ? (
                        <h1 className='mb-8 flex items-center gap-x-4 text-3xl font-bold md:text-4xl lg:text-5xl'>
                            Dashboard de {session.data?.user?.name}
                        </h1>
                    ) : (
                        <Skeleton className='mb-8 h-10 w-80 md:w-96' />
                    )}

                    <p className='mb-4'>
                        Bienvenido a tu dashboard, aquí podrás acceder a todas
                        las funcionalidades de PDFizado
                    </p>

                    <UploadPDF />
                </header>
                <h3 className='mt-6 text-xl font-semibold'>Tus PDFs:</h3>
                <Grid
                    columns={{ initial: '1', md: '2', lg: '3' }}
                    style={{
                        gap: 16,
                        margin: '32px 0px',
                    }}
                >
                    {!loading ? (
                        (Array.from({ length: 3 }, (_, i) => (
                            <div
                                key={i}
                                className='mx-auto w-[22rem] rounded-2xl border p-4'
                            >
                                <Skeleton className='mb-8 h-32' />

                                <Skeleton className='mb-2 h-2' />
                                <Skeleton className='mb-2 h-2' />
                                <Skeleton className='mb-2 h-2' />
                                <Skeleton className='mb-2 h-2' />
                                <Skeleton className='mb-8 h-2' />

                                <Skeleton className='h-16 w-full' />
                            </div>
                        )) as JSX.Element[])
                    ) : (
                        <h3 className='text-xl font-semibold'>Tus PDFs:</h3>
                    )}
                </Grid>
            </div>
        </main>
    );
};
export default Dashboard;
