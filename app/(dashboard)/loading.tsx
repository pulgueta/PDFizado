import { Loader2Icon } from 'lucide-react';

const Loading = () => {
	return (
		<div className='flex min-h-[calc(100vh-205px)] flex-col items-center justify-center gap-y-2'>
			<Loader2Icon className='h-6 w-6 animate-spin' />
		</div>
	);
};
export default Loading;
