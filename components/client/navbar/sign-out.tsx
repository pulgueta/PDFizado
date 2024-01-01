'use client';

import { useTransition } from 'react';

import { Button } from '~/shadcn/button';
import { logout } from './action';

export const SignOut = () => {
	const [isPending, startTransition] = useTransition();

	const onLogout = () => startTransition(async () => logout());

	return (
		<form action={onLogout}>
			<Button
				aria-label={isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
				id='logout-btn'
				variant='destructive'
				disabled={isPending}
			>
				{isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
			</Button>
		</form>
	);
};

export const SignOutMobile = () => {
	const [isPending, startTransition] = useTransition();

	const onLogout = () => startTransition(async () => logout());

	return (
		<form action={onLogout}>
			<Button
				className='w-full font-medium'
				aria-label={isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
				id='logout-btn'
				variant='destructive'
				disabled={isPending}
			>
				{isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
			</Button>
		</form>
	);
};
