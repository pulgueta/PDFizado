'use client';

import { useEffect } from 'react';

import { revalidatePath } from 'next/cache';
import { useParams } from 'next/navigation';

import { Button } from '~/components/ui/button';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
    const pathname = useParams();

    useEffect(() => {
        console.error(error.message);
    }, [error]);

    return (
        <main className='flex min-h-screen flex-col items-center justify-center gap-y-2'>
            <h1 className='text-center text-3xl font-bold'>
                &iexcl;Oops! Algo ha salido mal...
            </h1>
            <p className='text-center'>{`${error.digest}`}</p>
            <Button onClick={() => revalidatePath(pathname.toString())}>
                Intentarlo otra vez
            </Button>
        </main>
    );
};

export default Error;
