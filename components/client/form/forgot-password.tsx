'use client';

import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/shadcn/form';
import { Button } from '~/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';
import { Input } from '~/shadcn/input';
import { type ForgotPassword, forgotPasswordSchema } from '~/schemas';

export const ForgotPasswordForm = () => {
	const form = useForm<ForgotPassword>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = form.handleSubmit(async ({ email }: ForgotPassword) => {
		const res = await fetch('/api/email/forgot-password', {
			method: 'POST',
			body: JSON.stringify({
				email,
			}),
		});

		if (!res.ok) {
			switch (res.status) {
				case 404:
					toast.error('No existe el usuario', {
						description:
							'No hay un usuario registrado con ese correo electrónico.',
					});

					return;
				case 401:
					toast.error('Usuario no verificado', {
						description:
							'Debes verificar tu correo electrónico para poder cambiar tu contraseña.',
					});

					return;
				case 500:
					toast.error('Error', {
						description:
							'Ocurrió un error al enviar el correo de recuperación.',
					});

					return;
			}
		}

		toast.success('Correo enviado', {
			description:
				'Se ha enviado el correo de recuperación, revisa tu bandeja de entrada.',
		});

		form.clearErrors();
		form.reset();
	});

	return (
		<Card className='max-w-md'>
			<CardHeader>
				<CardTitle>Recuperar contraseña</CardTitle>
				<CardDescription>
					Ingresa tu correo electrónico para enviarte un link de
					recuperación de contraseña.
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
											disabled={
												form.formState.isSubmitting
											}
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
							id='submit-btn'
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<Loader2Icon className='h-4 w-4 animate-spin' />
							) : (
								'Recuperar contraseña'
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
