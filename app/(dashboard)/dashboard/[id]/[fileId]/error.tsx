'use client';

import { useRouter } from 'next/navigation';

import { Button } from '~/components/ui/button';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
    const { back } = useRouter();

    return (
        <main className='flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-y-4'>
            <h1 className='text-center text-3xl font-bold'>
                &iexcl;Oops! Algo ha salido mal...
            </h1>
            <h3 className='text-center text-xl font-semibold'>{`${error.name}`}</h3>
            <p className='text-center'>{`${
                error.message.includes(
                    `Cannot read properties of null (reading 'url')`
                ) && 'No hemos encontrado un archivo con esa ID...'
            }`}</p>
            <Button onClick={back} variant='outline'>
                Volver al dashboard
            </Button>
        </main>
    );
};

export default Error;
