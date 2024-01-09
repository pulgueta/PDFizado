'use client';

import { useRouter } from 'next/navigation';

import { Button } from '~/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
	const { push } = useRouter();

	return (
		<Card className='container max-w-md px-0'>
			<CardHeader>
				<CardTitle>Error cargando tu plan</CardTitle>
				<CardDescription>{error.name}</CardDescription>
			</CardHeader>
			<CardContent>{error.message}</CardContent>
			<CardFooter>
				<Button onClick={() => push('/dashboard')} className='w-full'>
					Volver al dashboard
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Error;
