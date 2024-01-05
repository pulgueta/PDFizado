import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { File } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';

import { Button, buttonVariants } from '~/shadcn/button';
import { Separator } from '~/shadcn/separator';
import { cn } from '~/lib/utils';
import { useDeletePDF } from '~/hooks/user/use-delete-pdf';

export const PDFCard: React.FC<File> = (file) => {
	const pathname = usePathname();

	const {
		mutation: { isPending },
		onDeleteFile,
	} = useDeletePDF({ file });

	const datetime = new Date(file.createdAt).toLocaleDateString('es-ES', {
		dateStyle: 'short',
	});

	const createdAt = new Date(file.createdAt).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<article className='mx-auto flex w-full flex-col rounded-2xl border bg-white p-4 shadow sm:w-96 md:w-96 dark:bg-neutral-900'>
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
					href={`${pathname}/${file.id}`}
					className={cn(
						buttonVariants({
							variant: 'ghost',
						}),
						isPending && 'cursor-not-allowed'
					)}
				>
					Ver PDF
				</Link>
				<Button
					variant='destructive'
					disabled={isPending}
					onClick={onDeleteFile(file.id)}
					size={isPending ? 'icon' : 'default'}
				>
					{isPending ? (
						<Loader2Icon className='size-4 animate-spin' />
					) : (
						'Eliminar PDF'
					)}
				</Button>
			</footer>
		</article>
	);
};
