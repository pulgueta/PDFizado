'use client';

import { signOut } from 'next-auth/react';

import { Button } from '~/shadcn/button';

export const SignOut = () => (
	<Button
		onClick={() => signOut({ callbackUrl: '/login' })}
		aria-label='Cerrar sesión'
		id='logout-btn'
		variant='destructive'
	>
		Cerrar sesión
	</Button>
);

export const SignOutMobile = () => (
	<Button
		className='w-full font-medium'
		aria-label='Cerrar sesión'
		id='logout-btn'
		onClick={() => signOut({ callbackUrl: '/login' })}
		variant='destructive'
	>
		Cerrar sesión
	</Button>
);
