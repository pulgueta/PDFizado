'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
	const { push, refresh } = useRouter();

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = form.handleSubmit(async ({ email, password }: Login) => {
		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (!res?.ok) {
			switch (res?.error) {
				case 'User not found':
					toast.error('Error de autenticación', {
						description:
							'No se ha encontrado un usuario con esas credenciales.',
					});

					return;
				case 'Email not verified':
					toast.error('Error de autenticación', {
						description:
							'Debes verificar tu correo antes de iniciar sesión.',
					});

					return;
				case 'Invalid credentials':
					toast.error('Error de autenticación', {
						description: 'Credenciales incorrectas.',
					});

					return;
				default:
					toast.error('Error', {
						description:
							'Ha ocurrido un error, intenta nuevamente.',
					});

					return;
			}
		}

		toast.success('Inicio de sesión', {
			description: 'Bienvenido de vuelta.',
		});
		refresh();
		push('/dashboard');
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
											id='email'
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
											id='password'
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
							id='submit-btn'
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
			<CardFooter className='flex flex-col items-center justify-center'>
				<Separator className='mb-4' />

				<Link
					href='/forgot-password'
					className={buttonVariants({ variant: 'link', size: 'sm' })}
				>
					Olvidé mi contraseña
				</Link>

				<span className='text-muted-foreground'>
					Si aún no tienes cuenta,{' '}
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
