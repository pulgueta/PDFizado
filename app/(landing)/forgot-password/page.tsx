import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ArrowLeftIcon } from 'lucide-react';

import { ForgotPasswordForm } from '~/components/client/form/forgot-password';
import { buttonVariants } from '~/shadcn/button';
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
		<section className='flex min-h-[calc(100vh-205px)] flex-col items-center justify-center p-2'>
			<Link
				href='/login'
				className={buttonVariants({
					variant: 'ghost',
					className: 'mb-2',
				})}
			>
				<ArrowLeftIcon className='mr-1 h-4 w-4' aria-hidden />
				Volver a iniciar sesión
			</Link>
			<ForgotPasswordForm />
		</section>
	);
};

export default ForgotPassword;
