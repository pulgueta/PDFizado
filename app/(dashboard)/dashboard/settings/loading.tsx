import { Loader2Icon } from 'lucide-react';

import { Card, CardContent } from '~/shadcn/card';

const Loading = () => {
	return (
		<Card className='container max-w-xl px-0'>
			<CardContent className='flex flex-col items-center justify-center gap-y-4 pt-4'>
				<Loader2Icon className='m-auto size-8 animate-spin' />
				<p className='text-center font-medium tracking-tight'>
					Cargado ajustes...
				</p>
			</CardContent>
		</Card>
	);
};
export default Loading;
