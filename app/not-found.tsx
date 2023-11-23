import type { Metadata } from 'next';
import Link from 'next/link';

/* eslint-disable tailwindcss/no-custom-classname */
import { FrownIcon } from 'lucide-react';

import { buttonVariants } from '~/components/ui/button';
import { auth } from '~/lib/auth';

export const metadata: Metadata = {
	title: 'Página no encontrada',
	description: 'No hemos encontrado la página que buscas.',
};

const _404 = async () => {
	const session = await auth();

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
