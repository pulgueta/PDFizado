'use client';

import { useTransition } from 'react';

import { Button } from '~/shadcn/button';
import { logout } from './action';

export const SignOut = () => {
	const [isPending, startTransition] = useTransition();

	const onLogout = () => startTransition(async () => logout());

	return (
		<form action={onLogout} className='w-full'>
			<Button
				id='logout-btn'
				variant='destructive'
				disabled={isPending}
				size='sm'
				className='w-full'
			>
				{isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
			</Button>
		</form>
	);
};
