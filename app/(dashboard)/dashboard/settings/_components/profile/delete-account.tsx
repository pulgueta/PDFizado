'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ExtendedUser } from '~/lib/auth/auth';

import { Button } from '~/shadcn/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/shadcn/dialog';

export const DeleteAccount = (user: ExtendedUser) => {
	const [pending, startTransition] = useTransition();

	const { refresh } = useRouter();

	const onDelete = () =>
		startTransition(async () => {
			await fetch('/api/user', {
				method: 'DELETE',
				body: JSON.stringify(user),
			});
			refresh();
		});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive' className='w-full md:w-max'>
					Eliminar mi cuenta
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 rounded-xl md:max-w-md'>
				<DialogHeader>
					<DialogTitle>
						¿Estás seguro que deseas eliminar tu cuenta?
					</DialogTitle>
					<DialogDescription>
						Este proceso no podrá revertirse luego
					</DialogDescription>
				</DialogHeader>
				<div className='grid grid-rows-1 gap-2 md:grid-cols-2'>
					<Button
						onClick={onDelete}
						variant='destructive'
						disabled={pending}
						aria-disabled={pending}
					>
						{pending ? 'Eliminando tu cuenta...' : 'Sí'}
					</Button>
					<DialogClose asChild>
						<Button variant='secondary'>No</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};
