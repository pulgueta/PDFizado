'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { buttonVariants } from '~/components/ui/button';

export const metadata: Metadata = {
	title: 'Página no encontrada',
	description: 'No hemos encontrado la página que buscas.',
};

const _404 = () => {
	const { fileId } = useParams();

	return (
		<section className='inset-0 -z-10 flex min-h-svh w-full flex-col items-center justify-start gap-y-4 px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#e11d48_100%)] md:min-h-[calc(100vh-205px)] md:justify-center'>
			<h1 className='text-center text-3xl font-bold tracking-tight md:text-5xl'>
				404 - No encontrado
			</h1>
			<p className='text-center text-base text-muted-foreground md:text-lg'>
				No hay un archivo con la id {fileId}
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
