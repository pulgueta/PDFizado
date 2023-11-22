import Link from 'next/link';

import { buttonVariants } from '~/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/shadcn/card';
import { ResetPassword as ResetPasswordForm } from '~/components/client/form/reset-password';
import { db } from '~/database/db';

type ResetToken = {
	searchParams: {
		token: string;
	};
};

const ResetPassword = async ({ searchParams }: ResetToken) => {
	const dbToken = await db.verificationToken.findUnique({
		where: {
			token: searchParams.token,
		},
	});

	const isTokenExpired =
		dbToken?.expires.toISOString()! < new Date().toISOString();

	return (
		<section className='mx-auto flex min-h-[calc(100vh-205px)] max-w-2xl flex-col items-center justify-center gap-y-4 p-2'>
			{!isTokenExpired ? (
				<>
					<h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
						Reestablecer contraseña
					</h1>
					<h3 className='scroll-m-20 text-center text-2xl font-semibold tracking-tight'>
						Escribe tu nueva contraseña y confírmala
					</h3>
					<Card className='w-full max-w-lg'>
						<CardHeader>
							<CardTitle>Reestablecer contraseña</CardTitle>
						</CardHeader>
						<CardContent>
							<ResetPasswordForm />
						</CardContent>
					</Card>
				</>
			) : (
				<>
					<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
						Token expirado
					</h1>
					<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						Tendrás que solicitar uno nuevo.
					</h3>
					<Link
						className={buttonVariants({ variant: 'link' })}
						href='/forgot-password'
					>
						Recuperar contraseña
					</Link>
				</>
			)}
		</section>
	);
};

export default ResetPassword;
