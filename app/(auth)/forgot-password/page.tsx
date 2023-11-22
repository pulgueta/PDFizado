import { redirect } from 'next/navigation';

import { Session, getServerSession } from 'next-auth';

import { ForgotPasswordForm } from '~/components/client/form/forgot-password';
import { authOptions } from '~/lib/auth';

const ForgotPassword = async () => {
	const session = (await getServerSession(authOptions)) as Session | null;

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
