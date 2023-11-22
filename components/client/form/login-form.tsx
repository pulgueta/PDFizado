'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/shadcn/form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';
import { Input } from '~/shadcn/input';
import { Separator } from '~/shadcn/separator';
import { Button, buttonVariants } from '~/shadcn/button';
import { loginSchema } from '~/schemas';
import type { Login } from '~/types';

export const LoginForm = () => {
	const { push } = useRouter();

	const { status } = useSession();

	if (status === 'authenticated') {
		push('/dashboard');
	}

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = form.handleSubmit(async (data: Login) => {
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (res?.status === 401 && res.error === 'Email not verified') {
			toast.error('Error de autenticación', {
				dismissible: true,
				description:
					'Debes verificar tu correo antes de iniciar sesión.',
			});

			return;
		}

		if (!res?.ok || res?.error === 'CredentialsSignin') {
			toast.error('Error de autenticación', {
				dismissible: true,
				description: 'Credenciales incorrectas.',
			});

			return;
		}

		if (res?.ok) {
			toast.success('Inicio de sesión', {
				dismissible: true,
				description: 'Bienvenido de vuelta.',
			});
			push('/dashboard');
		}
	});

	return (
		<Card className='w-full md:w-[512px]'>
			<CardHeader>
				<CardTitle>Iniciar sesión</CardTitle>
				<CardDescription>
					Accede a tu cuenta para iniciar a interactuar.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={onSubmit} className='space-y-6'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo electrónico</FormLabel>
									<FormControl>
										<Input
											autoComplete='Correo'
											placeholder='Tu correo registrado'
											type='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input
											autoComplete='Contraseña'
											placeholder='Tu contraseña'
											type='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='w-full'
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<Loader2Icon className='animate-spin' />
							) : (
								'Iniciar sesión'
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
			{/*
                // TODO: Implement Google Auth with next-auth
            */}
			<CardFooter className='flex flex-col items-center justify-center'>
				<Separator className='mb-4' />
				{/* <Button
                    className='my-4 w-full'
                    variant='secondary'
                    size='lg'
                    onClick={() => signIn('google')}
                >
                    <svg
                        height='24'
                        viewBox='0 0 24 24'
                        width='24'
                        className='mr-2'
                    >
                        <path
                            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                            fill='#4285F4'
                        />
                        <path
                            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                            fill='#34A853'
                        />
                        <path
                            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                            fill='#FBBC05'
                        />
                        <path
                            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                            fill='#EA4335'
                        />
                        <path d='M1 1h22v22H1z' fill='none' />
                    </svg>
                    Inicia sesión con Google
                </Button> */}

				<Link
					href='/forgot-password'
					className={buttonVariants({ variant: 'link', size: 'sm' })}
				>
					Olvidé mi contraseña
				</Link>

				<span className='text-muted-foreground'>
					Aún no tienes cuenta?{' '}
					<Link
						href='/register'
						className={buttonVariants({ variant: 'link' })}
					>
						Regístrate
					</Link>
				</span>
			</CardFooter>
		</Card>
	);
};
