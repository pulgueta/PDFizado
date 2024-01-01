import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { File } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';

import { Button, buttonVariants } from '~/shadcn/button';
import { cn } from '~/lib/utils';
import { useDeletePDF } from '~/hooks/user/use-delete-pdf';

export const PDFCard: React.FC<File> = (file) => {
	const pathname = usePathname();

	const {
		mutation: { isPending },
		onDeleteFile,
	} = useDeletePDF({ file });

	return (
		<div className='mx-auto flex w-full flex-col rounded-2xl border bg-white p-4 shadow sm:w-96 md:w-96 dark:bg-neutral-900'>
			<h3 className='truncate text-xl font-semibold'>{file.name}</h3>
			<span className='my-4 text-muted-foreground'>
				Fecha de subida:{' '}
				{new Date(file.createdAt).toLocaleDateString('es-ES', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</span>

			<div className='flex w-full items-center justify-between border-t pt-4'>
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
				>
					{isPending ? (
						<>
							<Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
							Eliminando PDF...
						</>
					) : (
						'Eliminar PDF'
					)}
				</Button>
			</div>
		</div>
	);
};
