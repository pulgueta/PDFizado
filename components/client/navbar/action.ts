'use server';

import { revalidatePath } from 'next/cache';

import { signOut } from '~/lib/auth/auth';

export const logout = async () => {
	await signOut({ redirectTo: '/login', redirect: true });
	revalidatePath('/');
};
