import { FC } from 'react';

import Link from 'next/link';

import { File } from '@prisma/client';

import { buttonVariants } from '~/shadcn/button';
import { Separator } from '~/shadcn/separator';
import { cn } from '~/lib/utils';
import { DeletePDF } from './delete-pdf-button';

export const PDFCard: FC<File> = (file) => {
	const datetime = new Date(file.createdAt).toLocaleDateString('es-ES', {
		dateStyle: 'short',
	});

	const createdAt = new Date(file.createdAt).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<article className='mx-auto flex w-full flex-col rounded-xl border bg-secondary p-4 shadow dark:bg-popover sm:w-96 md:w-96'>
			<header>
				<h3 className='truncate text-xl font-bold'>{file.name}</h3>
				<p className='text-muted-foreground'>
					Fecha de subida:{' '}
					<time dateTime={datetime}>{createdAt}</time>
				</p>
			</header>
			<Separator className='my-4' />
			<footer className='flex w-full items-center justify-between'>
				<Link
					href={`/dashboard/${file.id}`}
					className={cn(
						buttonVariants({
							variant: 'ghost',
						})
					)}
				>
					Ver PDF
				</Link>
				<DeletePDF file={file} />
			</footer>
		</article>
	);
};
