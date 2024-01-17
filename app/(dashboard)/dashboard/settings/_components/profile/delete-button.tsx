'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { DialogClose } from '~/shadcn/dialog';
import { Button } from '~/shadcn/button';
import { ExtendedUser } from '~/lib/auth/auth';

export const DeleteButton = ({ user }: { user: ExtendedUser }) => {
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
	);
};
