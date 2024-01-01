'use client';

import { useTransition } from 'react';

import Link from 'next/link';

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
import { register } from './actions/auth';

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<Register>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			name: '',
		},
	});

	const onSubmit = form.handleSubmit((data: Register) => {
		startTransition(async () => {
			const res = await register(data);

			if (res.error) {
				toast.error(`${res.error}`);
				return;
			}

			toast.success('Cuenta creada con éxito', {
				description:
					'Revisa tu correo electrónico para confirmar tu cuenta.',
			});
			form.reset();
			form.clearErrors();
		});
	});

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
					<form onSubmit={onSubmit}>
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
												disabled={isPending}
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
												disabled={isPending}
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
												disabled={isPending}
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
												disabled={isPending}
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
							disabled={isPending}
						>
							{isPending ? (
								<Loader2Icon className='animate-spin' />
							) : (
								'Registrarme'
							)}
						</Button>
					</form>
					<span className='mt-4 block text-center text-sm text-muted-foreground'>
						Al registrarte, aceptas nuestros{' '}
						<Link href='/terms-of-service'>
							Términos y Condiciones
						</Link>
					</span>
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
