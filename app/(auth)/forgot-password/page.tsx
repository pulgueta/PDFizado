'use client';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { ForgotPasswordForm } from '~/components/client/form/forgot-password';

const ForgotPassword = () => {
	const { push } = useRouter();

	const { status } = useSession();

	if (status === 'authenticated') {
		push('/dashboard');
	}

	return (
		<section className='flex min-h-[calc(100vh-205px)] items-center justify-center'>
			<ForgotPasswordForm />
		</section>
	);
};
export default ForgotPassword;
