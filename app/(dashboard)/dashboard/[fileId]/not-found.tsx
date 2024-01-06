import type { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';

export const metadata: Metadata = {
	title: 'Página no encontrada',
	description: 'No hemos encontrado la página que buscas.',
};

const _404 = () => {
	return (
		<section className='flex min-h-[calc(100vh-205px)] flex-col items-center justify-center gap-y-2'>
			<h1 className='mb-2 text-center text-3xl font-bold'>
				404 - No encontrado
			</h1>
			<p className='text-center text-muted-foreground'>
				No hay un archivo con esa ID
			</p>
			<Link
				href='/dashboard'
				className={buttonVariants({ variant: 'ghost' })}
			>
				Volver al dashboard
			</Link>
		</section>
	);
};
export default _404;
