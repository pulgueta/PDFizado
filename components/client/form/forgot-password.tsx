'use client';

import { ElementRef, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import Link from 'next/link';

import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';

import { Button, buttonVariants } from '~/shadcn/button';
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
					<Submit />
				</form>
			</CardContent>
			<CardFooter className='flex-col justify-center'>
				<Separator />
				<Link
					href='/forgot-password'
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

const Submit = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			className='w-full'
			id='submit-btn'
			disabled={pending}
		>
			{pending ? (
				<Loader2Icon className='animate-spin' />
			) : (
				'Recuperar contraseña'
			)}
		</Button>
	);
};
