'use client';

import { useFormStatus } from 'react-dom';

import { Loader2Icon } from 'lucide-react';

import { Button } from '~/shadcn/button';

export const SubmitButton = ({ label }: { label: string }) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			className='w-full'
			id='submit-btn'
			disabled={pending}
		>
			{pending ? <Loader2Icon className='animate-spin' /> : label}
		</Button>
	);
};
