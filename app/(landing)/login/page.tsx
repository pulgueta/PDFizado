import { Metadata } from 'next';

import { LoginForm } from '~/components/client/form/login-form';

export const metadata: Metadata = {
	title: 'Iniciar sesión',
	description: 'Inicia sesión en PDFizado para acceder a tu perfil',
};

const Login = () => {
	return (
		<div className='flex min-h-[calc(100vh-205px)] items-center justify-center bg-white p-2 dark:bg-[#131110]'>
			<LoginForm />
		</div>
	);
};
export default Login;
