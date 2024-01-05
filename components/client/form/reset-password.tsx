'use client';

import { useRouter, useSearchParams } from 'next/navigation';

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
import { Input } from '~/shadcn/input';
import { Button } from '~/shadcn/button';
import { type ResetPassword as Reset, resetSchema } from '~/schemas';

export const ResetPassword = () => {
	const { get } = useSearchParams();
	const { push } = useRouter();

	const token = get('token');

	const form = useForm<Reset>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
			email: '',
		},
	});

	const onSubmit = form.handleSubmit(async (data: Reset) => {
		const res = await fetch('/api/email/change-password', {
			method: 'POST',
			body: JSON.stringify({
				...data,
				token,
			}),
		});

		if (!res.ok) {
			switch (res.status) {
				case 400:
					toast.error('El token ha expirado');
					return;
				case 401:
					toast.error('El token es inválido');
					return;
				default:
					toast.error('Ha ocurrido un error');
					return;
			}
		}

		toast.success('Cambio de contraseña', {
			description: 'Contraseña reestablecida con éxito',
		});
		push(res.url);
	});

	return (
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
									disabled={form.formState.isSubmitting}
									autoComplete='Correo electrónico'
									placeholder='Tu correo electrónico'
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
							<FormLabel>Nueva contraseña</FormLabel>
							<FormControl>
								<Input
									disabled={form.formState.isSubmitting}
									autoComplete='Contraseña'
									placeholder='Tu nueva contraseña'
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
							<FormLabel>Confirma tu nueva contraseña</FormLabel>
							<FormControl>
								<Input
									disabled={form.formState.isSubmitting}
									autoComplete='Confirmar contraseña'
									placeholder='Confirma tu nueva contraseña'
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
						'Reestablecer contraseña'
					)}
				</Button>
			</form>
		</Form>
	);
};
