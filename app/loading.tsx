import { Loader2Icon } from 'lucide-react';

const Loading = () => {
	return (
		<div className='flex min-h-[calc(100dvh-205px)] flex-col items-center justify-center gap-y-4'>
			<h2 className='text-center text-2xl font-semibold'>Cargando...</h2>
			<Loader2Icon className='h-6 w-6 animate-spin' />
		</div>
	);
};
export default Loading;
