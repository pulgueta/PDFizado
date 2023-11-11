import Link from 'next/link';

/* eslint-disable tailwindcss/no-custom-classname */
import { getServerSession } from 'next-auth';
import { FrownIcon } from 'lucide-react';

import { authOptions } from '~/lib/auth';
import { buttonVariants } from '~/components/ui/button';

const _404 = async () => {
    const session = await getServerSession(authOptions);

    return (
        <section
            className={`min-h-[calc(100vh-${
                session !== null ? '80px' : '205px'
            })] flex flex-col items-center justify-center gap-y-2`}
        >
            <FrownIcon
                aria-label='Cara triste'
                className='h-12 w-12 text-muted-foreground'
            />
            <h1 className='mb-2 text-center text-3xl font-bold'>
                404 - Página no encontrada
            </h1>
            <p className='text-center text-muted-foreground'>
                Lo sentimos, pero la página que buscas no existe.
            </p>
            <Link
                href='/'
                aria-label='Volver al inicio'
                className={buttonVariants({ variant: 'ghost' })}
            >
                Volver al inicio
            </Link>
        </section>
    );
};
export default _404;
