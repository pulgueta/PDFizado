'use client';

import { Grid } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

import { Button } from '@/shadcn/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shadcn/card';
import { Skeleton } from '@/shadcn/skeleton';

const Dashboard = () => {
    const session = useSession();

    return (
        <main className='min-h-[calc(100vh-80px)]'>
            <div className='mx-auto max-w-7xl p-4'>
                <h1 className='mb-8 flex items-center gap-x-4 text-3xl font-bold md:text-4xl lg:text-5xl'>
                    {session.data?.user?.name ? (
                        `Dashboard de ${session.data?.user?.name}`
                    ) : (
                        <Skeleton className='h-10 w-80' />
                    )}
                </h1>

                <p>
                    Bienvenido a tu dashboard, aquí podrás acceder a todas las
                    funcionalidades de PDFizado
                </p>
                <Button className='mt-2 font-bold'>Subir PDF</Button>
                <Grid
                    columns={{ initial: '1', md: '2', lg: '3' }}
                    style={{
                        gap: 16,
                        margin: '16px 0px',
                    }}
                >
                    <Card className='mx-auto w-[21rem] bg-neutral-50 dark:bg-[#131110]'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-3xl font-bold'>
                                Gratis
                            </CardTitle>
                            <CardDescription>
                                Para documentos simples
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className='w-full'>Adquirir</Button>
                        </CardFooter>
                    </Card>
                    <Card className='mx-auto w-[21rem] bg-neutral-50 dark:bg-[#131110]'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-3xl font-bold'>
                                Gratis
                            </CardTitle>
                            <CardDescription>
                                Para documentos simples
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className='w-full'>Adquirir</Button>
                        </CardFooter>
                    </Card>
                    <Card className='mx-auto w-[21rem] bg-neutral-50 dark:bg-[#131110]'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-3xl font-bold'>
                                Gratis
                            </CardTitle>
                            <CardDescription>
                                Para documentos simples
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className='w-full'>Adquirir</Button>
                        </CardFooter>
                    </Card>
                    <Card className='mx-auto w-[21rem] bg-neutral-50 dark:bg-[#131110]'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-3xl font-bold'>
                                Gratis
                            </CardTitle>
                            <CardDescription>
                                Para documentos simples
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className='w-full'>Adquirir</Button>
                        </CardFooter>
                    </Card>
                    <Card className='mx-auto w-[21rem] bg-neutral-50 dark:bg-[#131110]'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-3xl font-bold'>
                                Gratis
                            </CardTitle>
                            <CardDescription>
                                Para documentos simples
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className='w-full'>Adquirir</Button>
                        </CardFooter>
                    </Card>
                    <Card className='mx-auto w-[21rem] bg-neutral-50 dark:bg-[#131110]'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-3xl font-bold'>
                                Gratis
                            </CardTitle>
                            <CardDescription>
                                Para documentos simples
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className='w-full'>Adquirir</Button>
                        </CardFooter>
                    </Card>
                </Grid>
            </div>
        </main>
    );
};
export default Dashboard;
