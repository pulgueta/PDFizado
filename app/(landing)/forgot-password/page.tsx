import { Metadata } from 'next';

import { ForgotPasswordForm } from '~/components/client/form/forgot-password';

export const metadata: Metadata = {
	title: 'Olvidé mi contraseña',
	description: 'Recupera tu contraseña de PDFizado',
};

const ForgotPassword = () => {
	return (
		<section className='flex min-h-[calc(100dvh-205px)] flex-col items-center justify-center p-2'>
			<ForgotPasswordForm />
		</section>
	);
};

export default ForgotPassword;
