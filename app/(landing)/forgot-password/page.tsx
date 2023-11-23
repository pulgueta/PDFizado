import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ForgotPasswordForm } from '~/components/client/form/forgot-password';
import { auth } from '~/lib/auth';

export const metadata: Metadata = {
	title: 'Olvidé mi contraseña',
	description: 'Recupera tu contraseña de PDFizado',
};

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
