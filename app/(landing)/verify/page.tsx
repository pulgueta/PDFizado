import { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '~/shadcn/button';
import { db } from '~/database/db';

type VerifyEmail = {
	searchParams: {
		id: string;
	};
};

export const metadata: Metadata = {
	title: 'Verificar tu correo electrónico',
	description:
		'Verifica tu correo electrónico de PDFizado para poder iniciar sesión.',
};

const Verify = async ({ searchParams }: VerifyEmail) => {
	if (!searchParams.id) return <NoIdProvided />;

	const user = await db.user.findUnique({
		where: {
			id: searchParams.id,
		},
	});

	if (!user) return <InvalidId />;

	if (!user?.emailVerified)
		await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				emailVerified: true,
			},
		});

	return (
		<section className='container flex min-h-[calc(100dvh-205px)] flex-col items-center justify-center gap-y-4 p-2'>
			<h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
				Se ha verificado tu cuenta
			</h1>
			<h3 className='scroll-m-20 text-center text-2xl font-semibold tracking-tight'>
				Ahora solo debes iniciar sesión
			</h3>
			<Link className={buttonVariants({ variant: 'link' })} href='/login'>
				Iniciar sesión
			</Link>
		</section>
	);
};

export default Verify;

const NoIdProvided = () => (
	<section className='container flex min-h-[calc(100dvh-205px)] flex-col items-center justify-center gap-y-4 p-2'>
		<h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
			No se ha proporcionado un id
		</h1>
		<h3 className='scroll-m-20 text-center text-2xl font-semibold tracking-tight'>
			Necesitas un id válido para verificar tu correo electrónico.
		</h3>
		<Link className={buttonVariants({ variant: 'link' })} href='/register'>
			Crear cuenta
		</Link>
	</section>
);

const InvalidId = () => (
	<section className='container flex min-h-[calc(100dvh-205px)] flex-col items-center justify-center gap-y-4 p-2'>
		<h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
			No es un id válido
		</h1>
		<h3 className='scroll-m-20 text-center text-2xl font-semibold tracking-tight'>
			Necesitas un id válido para verificar tu correo electrónico.
		</h3>
		<Link className={buttonVariants({ variant: 'link' })} href='/register'>
			Crear cuenta
		</Link>
	</section>
);
