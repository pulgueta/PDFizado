'use client';

import { signOut } from 'next-auth/react';

import { Button } from '~/shadcn/button';

export const SignOut = () => (
	<Button
		onClick={() => signOut({ callbackUrl: '/' })}
		aria-label='Cerrar sesión'
		variant='destructive'
	>
		Cerrar sesión
	</Button>
);

export const SignOutMobile = () => (
	<Button
		className='w-full font-medium'
		aria-label='Cerrar sesión'
		onClick={() => signOut({ callbackUrl: '/' })}
		variant='destructive'
	>
		Cerrar sesión
	</Button>
);
