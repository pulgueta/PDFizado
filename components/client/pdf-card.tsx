import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { File } from '@prisma/client';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

import { Button, buttonVariants } from '~/shadcn/button';
import { cn } from '~/lib/utils';

export const PDFCard: React.FC<File> = (file) => {
	const pathname = usePathname();

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationKey: ['deleteFile'],
		mutationFn: (id: string) => {
			const files = fetch('/api/files', {
				method: 'DELETE',
				body: JSON.stringify({ id, key: file.awsKey }),
			}).then((res) => res.json());

			return files;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['files'],
			});
			toast.success('PDF eliminado correctamente');
		},
		onError: () => toast.error('Error al eliminar el PDF'),
		retry: 3,
		retryDelay: 1000,
	});

	const onDeleteFile = (id: string) => () => mutate(id);

	return (
		<div className='mx-auto flex w-80 flex-col rounded-2xl border p-4 md:w-96'>
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
						<Loader2Icon className='h-4 w-4 animate-spin' />
					) : (
						'Eliminar PDF'
					)}
				</Button>
			</div>
		</div>
	);
};
