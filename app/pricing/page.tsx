'use client';

import { PriceCards } from '~/components/prices/card-details';
import { useCountry } from '~/hooks';

const Pricing = () => {
    const country = useCountry();

    return (
        <div className='relative min-h-[calc(100vh-80px)] bg-white p-4 dark:bg-[#1C1917]'>
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
        </div>
    );
};
export default Pricing;
