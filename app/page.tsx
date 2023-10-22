'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { Badge } from '@/shadcn/badge';
import { buttonVariants } from '@/shadcn/button';
import { PriceCards } from '@/components/prices/card-details';
import { useCountry } from '@/hooks';

const Home: NextPage = () => {
    const country = useCountry();

    return (
        <main className='min-h-screen bg-white p-2 dark:bg-[#1C1917]'>
            <div className='relative z-40 mx-auto mt-8 max-w-4xl animate-fade-up rounded-3xl border bg-white px-4 py-8 text-center shadow animate-once animate-ease-out dark:bg-[#131110] md:py-12'>
                <h1 className='mb-4 text-6xl font-black text-black dark:text-white md:mb-8 md:text-7xl lg:text-8xl'>
                    <span className='text-primary'>PDF</span>izado
                </h1>
                <p className='mb-8 text-base md:text-xl'>
                    Haz tu estudio más fácil interactuando con la Inteligencia
                    Artificial mediante un chat para extraer la información más
                    relevante de tus archivos{' '}
                    <span className='font-bold'>PDF.</span>
                </p>
                <p className='text-lg md:text-2xl'>
                    &iexcl;Solamente arrastra tu archivo y puedes empezar a
                    preguntar lo que necesites!
                </p>
                <div className='absolute right-0 z-10 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
                <div className='absolute -left-16 top-0 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
                <Badge
                    className='absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1/2'
                    aria-label='Demostración'
                >
                    En desarrollo a día de {new Date().toLocaleDateString()}
                </Badge>
            </div>

            <section className='relative mt-16 w-full animate-fade-up p-4 animate-once animate-ease-in-out'>
                <h1 className='text-center text-5xl font-bold'>
                    Interfaz y utilidad
                </h1>
                <p className='my-8 text-center text-base md:text-lg'>
                    Contamos con una interfaz sencilla de utilizar y fácil de
                    entender para una accesibilidad con alcance total para todo
                    tipo de usuarios.
                </p>
                <div className='mt-8 flex flex-col items-center justify-center md:flex-row'>
                    <div className='relative mt-4 w-full md:w-3/4'>
                        <Image
                            src='/landing.webp'
                            alt='PDFizado - UI'
                            width={900}
                            height={500}
                            priority
                            quality={100}
                            className='relative z-40 mx-auto rounded-xl shadow-xl'
                        />
                        <Badge
                            className='absolute -bottom-2 left-1/2 z-40 -translate-x-1/2'
                            aria-label='Demostración'
                        >
                            Demostración
                        </Badge>
                    </div>
                </div>
            </section>

            <div className='mx-auto my-16 w-full md:w-11/12'>
                <h1 className='mb-8 text-center text-3xl font-black md:mb-8 md:text-5xl'>
                    Tenemos 3 planes para que puedas utilizar{' '}
                    <span className='text-primary'>PDF</span>izado
                </h1>
                <p className='mb-8 text-center text-muted-foreground'>
                    *Precio en {country === 'CO' ? 'COP' : 'USD'}
                </p>
                <div className='mx-auto flex w-full flex-col gap-8 md:flex-row md:flex-wrap'>
                    <PriceCards />
                </div>
            </div>
            <section className='flex w-full flex-col items-center justify-center gap-8 rounded-xl bg-secondary px-2 py-8 shadow-sm dark:bg-[#131110] md:py-16'>
                <h1 className='text-center text-3xl font-bold dark:text-white md:text-4xl'>
                    &iquest;Qué esperas para agilizar tu forma de estudiar?
                </h1>
                <Link
                    href='/register'
                    className={buttonVariants({
                        variant: 'default',
                        size: 'lg',
                        className: 'text-xl',
                    })}
                >
                    Empezar
                    <ArrowRightIcon className='ml-2 h-6 w-6' />
                </Link>
            </section>
            <div className='absolute bottom-0 left-16 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
            <div className='absolute -bottom-32 right-8 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
        </main>
    );
};
export default Home;
