'use client';

import { ElementRef, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { toast } from 'sonner';

import { Button } from '~/shadcn/button';
import { Label } from '~/shadcn/label';
import { Textarea } from '~/shadcn/textarea';
import { Input } from '~/shadcn/input';
import { action } from './action';

export const Form = ({ email }: { email: string }) => {
	const [state, formAction] = useFormState(action, {
		success: false,
		message: '',
	});

	const form = useRef<ElementRef<'form'>>(null);

	useEffect(() => {
		switch (state.success) {
			case false:
				if (state.message.length > 1) {
					toast.error(state.message);
					return;
				}
			case true:
				if (state.message.length > 1) {
					toast.success(state.message);
					form.current?.reset();
				}
				break;
		}
	}, [state]);

	return (
		<form action={formAction} ref={form} className='flex flex-col gap-y-4'>
			<Label htmlFor='email'>Correo electrónico</Label>
			<Input name='email' id='email' placeholder={email} disabled />
			<Label htmlFor='issue'>Describe tu problema</Label>
			<Textarea
				name='issue'
				id='issue'
				placeholder='Mi plan no se ha actualizado y pagué...'
				className='h-32'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						form.current?.requestSubmit();
					}
				}}
			/>
			<Submit />
		</form>
	);
};

const Submit = () => {
	const { pending } = useFormStatus();

	return (
		<Button className='w-full' disabled={pending}>
			{pending ? 'Enviando tu inquietud...' : 'Enviar'}
		</Button>
	);
};
