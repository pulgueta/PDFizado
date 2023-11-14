/* eslint-disable @tanstack/query/exhaustive-deps */
'use client';

import { Grid } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { File } from '@prisma/client';

import UploadPDF from '~/components/client/dialog/pdf/upload-pdf';
import { PDFCard } from '~/components/client/pdf-card';
import { PDFLoader } from '~/components/server/pdf-loaders';
import { HeaderName } from '~/components/server/header-name';

const Dashboard = () => {
    const { data, error, isLoading, isSuccess } = useQuery<File[]>({
        queryKey: ['files'],
        queryFn: async () => {
            const res = await fetch('/api/files');
            const data = await res.json();

            return data;
        },
    });

    return (
        <>
            <header className='mx-auto max-w-7xl p-4'>
                <HeaderName />

                <p className='mb-4'>
                    Bienvenido a tu dashboard, aquí podrás acceder a todas las
                    funcionalidades de PDFizado
                </p>

                <UploadPDF />
            </header>
            <main className='min-h-[calc(100vh-80px)]'>
                <div className='mx-auto max-w-7xl p-4'>
                    <h3 className='mt-6 text-xl font-semibold'>Tus PDFs:</h3>
                    <Grid
                        columns={{ initial: '1', md: '2', lg: '3' }}
                        style={{
                            gap: 16,
                            margin: '32px 0px',
                        }}
                    >
                        {isLoading && <PDFLoader />}

                        {isSuccess &&
                            data.length > 0 &&
                            data.map((file) => (
                                <PDFCard
                                    key={file.awsKey}
                                    awsKey={file.awsKey}
                                    createdAt={file.createdAt}
                                    name={file.name}
                                    id={file.id}
                                    updatedAt={file.updatedAt}
                                    userId={file.userId}
                                    url={file.url}
                                />
                            ))}

                        {data && data.length === 0 && (
                            <div className='w-full rounded-lg border p-4'>
                                <p className='text-center text-base font-semibold'>
                                    No tienes PDFs
                                </p>
                            </div>
                        )}
                        {error && (
                            <div className='flex w-[22rem] flex-col items-center gap-4 rounded-lg border p-4'>
                                <p className='text-center text-lg font-semibold'>
                                    Error al cargar tus PDFs
                                </p>
                                <p className='text-center'>{error.name}</p>
                                <p className='text-center'>{error.message}</p>
                                <p className='text-center'>{error.stack}</p>
                            </div>
                        )}
                    </Grid>
                </div>
            </main>
        </>
    );
};
export default Dashboard;
