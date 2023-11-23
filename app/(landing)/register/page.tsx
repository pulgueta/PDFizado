import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { RegisterForm } from '~/components/client/form/register-form';
import { auth } from '~/lib/auth';

export const metadata: Metadata = {
	title: 'Registrarse',
	description:
		'Regístrate en PDFizado y verifica tu cuenta para acceder a tu perfil',
};

const Register = async () => {
	const session = await auth();

	if (session !== null) {
		redirect('/dashboard');
	}

	return (
		<div className='flex min-h-[calc(100vh-205px)] items-center justify-center bg-white p-4 dark:bg-[#131110]'>
			<RegisterForm />
		</div>
	);
};
export default Register;
