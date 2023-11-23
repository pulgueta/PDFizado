import { redirect } from 'next/navigation';

import { ForgotPasswordForm } from '~/components/client/form/forgot-password';
import { auth } from '~/lib/auth';

const ForgotPassword = async () => {
	const session = await auth();

	if (session) {
		redirect('/dashboard');
	}

	return (
		<section className='flex min-h-[calc(100vh-205px)] items-center justify-center'>
			<ForgotPasswordForm />
		</section>
	);
};

export default ForgotPassword;
