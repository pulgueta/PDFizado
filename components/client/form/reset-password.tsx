'use client';

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
import { resetSchema } from '~/schemas';
import type { ResetPassword as Reset } from '~/types';

export const ResetPassword = () => {
	const form = useForm<Reset>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = form.handleSubmit(async (data: Reset) => {
		toast.success(JSON.stringify(data, null, 2));
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className='space-y-6'>
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
