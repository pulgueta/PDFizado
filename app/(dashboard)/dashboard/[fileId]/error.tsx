'use client';

import { useRouter } from 'next/navigation';

import { Button } from '~/components/ui/button';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
	const { push } = useRouter();

	return (
		<main className='flex h-[calc(100dvh-80px)] flex-col items-center justify-center'>
			<section className='mx-auto flex max-w-5xl flex-col items-center justify-center gap-y-4'>
				<h1 className='text-center text-3xl font-bold'>
					&iexcl;Oops! Algo ha salido mal...
				</h1>
				<h3 className='text-center text-xl font-semibold'>{`${error.name}`}</h3>
				<p className='text-center'>{`${
					error.message.includes(
						`Cannot read properties of null (reading 'url')`
					)
						? 'No hemos encontrado un archivo con esa ID...'
						: `${error.message}`
				}`}</p>
				<Button onClick={() => push('/dashboard')} variant='outline'>
					Volver al dashboard
				</Button>
			</section>
		</main>
	);
};

export default Error;
