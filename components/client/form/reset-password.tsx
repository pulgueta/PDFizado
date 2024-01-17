'use client';

import { ElementRef, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { toast } from 'sonner';

import { Input } from '~/shadcn/input';
import { Label } from '~/shadcn/label';
import { updatePassword } from './actions/password';
import { SubmitButton } from './submit-button';

export const ResetPassword = () => {
	const [state, action] = useFormState(updatePassword, undefined);

	const form = useRef<ElementRef<'form'>>(null);

	useEffect(() => {
		if (state?.success) {
			toast.success('Tu contraseña ha sido actualizada');

			form.current?.reset();
		}

		if (state?.error) {
			toast.error(`${state.error}`);
		}
	}, [state]);

	return (
		<form action={action} className='flex flex-col gap-4' ref={form}>
			<Label>Nueva contraseña</Label>
			<Input
				autoComplete='Contraseña'
				placeholder='Tu nueva contraseña'
				name='password'
				type='password'
			/>

			<Label>Confirma tu nueva contraseña</Label>
			<Input
				autoComplete='Confirmar contraseña'
				placeholder='Confirma tu nueva contraseña'
				name='confirmPassword'
				type='password'
			/>

			<SubmitButton label='Actualizar contraseña' />
		</form>
	);
};
