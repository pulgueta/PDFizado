'use client';

import { File } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';

import { useDeletePDF } from '~/hooks/user/use-delete-pdf';
import { Button } from '~/shadcn/button';

export const DeletePDF = ({ file }: { file: File }) => {
	const {
		mutation: { isPending },
		onDeleteFile,
	} = useDeletePDF({ file });

	return (
		<Button
			variant='destructive'
			disabled={isPending}
			onClick={onDeleteFile(file.id)}
			size={isPending ? 'icon' : 'default'}
		>
			{isPending ? (
				<Loader2Icon className='size-4 animate-spin' />
			) : (
				'Eliminar'
			)}
		</Button>
	);
};
