'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
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
import { Button, buttonVariants } from '~/shadcn/button';
import { registerSchema } from '~/schemas';
import type { Register } from '~/types';

export const RegisterForm = () => {
	const { push } = useRouter();

	const { status } = useSession();

	if (status === 'authenticated') {
		push('/dashboard');
	}

	const form = useForm<Register>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			name: '',
		},
	});

	const onSubmit = async (data: Register) => {
		try {
			const fetch_res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!fetch_res.ok) {
				toast.error(
					fetch_res.statusText === 'Internal Server Error'
						? 'Ocurrió un error inesperado'
						: fetch_res.statusText
				);
				return;
			}

			toast.success(
				'Cuenta creada, te hemos enviado un correo de verificación',
				{
					duration: 1500,
					dismissible: true,
					important: true,
				}
			);
			form.reset();
			form.clearErrors();
		} catch (error) {
			toast.error('Ocurrió un error inesperado');
		}
	};

	return (
		<Card className='w-full md:w-[640px]'>
			<CardHeader>
				<CardTitle>Registro</CardTitle>
				<CardDescription>
					Crea una cuenta para poder usar PDFizado.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input
												autoComplete='Nombre'
												disabled={
													form.formState.isSubmitting
												}
												placeholder='Tu nombre'
												type='text'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Correo electrónico
										</FormLabel>
										<FormControl>
											<Input
												autoComplete='Email'
												disabled={
													form.formState.isSubmitting
												}
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
												disabled={
													form.formState.isSubmitting
												}
												placeholder='Tu contraseña'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Confirmar contraseña
										</FormLabel>
										<FormControl>
											<Input
												autoComplete='Confirmar contraseña'
												disabled={
													form.formState.isSubmitting
												}
												placeholder='Reescribe tu contraseña'
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type='submit'
							className='w-full'
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<Loader2Icon className='animate-spin' />
							) : (
								'Registrarme'
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className='flex flex-col items-center justify-center'>
				<span className='text-muted-foreground'>
					Ya tienes cuenta?{' '}
					<Link
						href='/login'
						className={buttonVariants({ variant: 'link' })}
					>
						Inicia sesión
					</Link>
				</span>
			</CardFooter>
		</Card>
	);
};
