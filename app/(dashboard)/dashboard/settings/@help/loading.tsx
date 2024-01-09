import { Loader2Icon } from 'lucide-react';

import { Card, CardContent } from '~/shadcn/card';

const Loading = () => {
	return (
		<Card className='container max-w-xl px-0'>
			<CardContent className='flex flex-col gap-y-4 pt-4'>
				<Loader2Icon className='m-auto size-8 animate-spin' />
			</CardContent>
		</Card>
	);
};
export default Loading;
