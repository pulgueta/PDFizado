'use client';

import { ElementRef, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import Link from 'next/link';

import { toast } from 'sonner';

import { buttonVariants } from '~/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';
import { Input } from '~/shadcn/input';
import { Label } from '~/shadcn/label';
import { Separator } from '~/shadcn/separator';
import { forgotPassword } from './actions/password';
import { SubmitButton } from './submit-button';

export const ForgotPasswordForm = () => {
	const [state, action] = useFormState(forgotPassword, undefined);
	const form = useRef<ElementRef<'form'>>(null);

	useEffect(() => {
		if (state?.status === 'success') {
			toast.success(
				'Te hemos enviado un correo, podría tardar unos minutos'
			);

			form.current?.reset();
		}

		if (state?.error) {
			toast.error(`${state.error}`);
		}
	}, [state]);

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
				<form action={action} ref={form}>
					<Label>Correo electrónico</Label>
					<Input
						autoComplete='Correo'
						placeholder='Tu correo registrado'
						type='email'
						id='email'
						name='email'
						className='mb-4 mt-2'
					/>
					<SubmitButton label='Recuperar contraseña' />
				</form>
			</CardContent>
			<CardFooter className='flex-col justify-center'>
				<Separator />
				<Link
					href='/login'
					className={buttonVariants({
						variant: 'link',
						size: 'sm',
						className: 'mt-4',
					})}
				>
					Volver a iniciar sesión
				</Link>
			</CardFooter>
		</Card>
	);
};
