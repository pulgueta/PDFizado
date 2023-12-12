import { Metadata } from 'next';

import { RegisterForm } from '~/components/client/form/register-form';

export const metadata: Metadata = {
	title: 'Registrarse',
	description:
		'Regístrate en PDFizado y verifica tu cuenta para acceder a tu perfil',
};

const Register = () => {
	return (
		<div className='flex min-h-[calc(100vh-205px)] items-center justify-center bg-white p-2 dark:bg-[#131110]'>
			<RegisterForm />
		</div>
	);
};
export default Register;
