import { toast } from 'sonner';
import { z } from 'zod';
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
import { forgotPasswordSchema } from '~/schemas';

export const ForgotPasswordForm = () => {
	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = form.handleSubmit(
		async ({ email }: z.infer<typeof forgotPasswordSchema>) => {
			const res = await fetch('/api/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
				}),
			});

			if (!res?.ok) {
				toast.error('Error al enviar', {
					dismissible: true,
					description:
						'Se ha producido un error al enviar el correo, intenta de nuevo.',
				});
			} else {
				toast.success('Correo enviado', {
					dismissible: true,
					description:
						'Se ha enviado el correo de recuperación, revisa tu bandeja de entrada.',
				});
				form.clearErrors();
				form.reset();
			}
		}
	);

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
								<Loader2Icon className='mr-2 animate-spin' />
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
