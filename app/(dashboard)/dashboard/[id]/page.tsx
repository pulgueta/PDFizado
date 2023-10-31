'use client';

import { useState } from 'react';

import { Grid } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/shadcn/card';
import { Skeleton } from '~/shadcn/skeleton';
import UploadPDF from '~/components/dialog/upload-pdf';

const Dashboard = () => {
    const [loading] = useState<boolean>(true);

    const session = useSession();

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
                <Grid
                    columns={{ initial: '1', md: '2', lg: '3' }}
                    style={{
                        gap: 16,
                        margin: '32px 0px',
                    }}
                >
                    {!loading ? (
                        (Array.from({ length: 6 }, (_, i) => (
                            <Card key={i} className='mx-auto w-96'>
                                <CardHeader>
                                    <CardTitle>
                                        <Skeleton className='h-24' />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className='mb-2 h-4' />
                                    <Skeleton className='mb-2 h-4' />
                                    <Skeleton className='mb-2 h-4' />
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className='h-6 w-full' />
                                </CardFooter>
                            </Card>
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
