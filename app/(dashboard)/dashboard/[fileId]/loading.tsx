import { Skeleton } from '~/components/ui/skeleton';

const Loading = () => {
	return (
		<div className='flex h-[calc(100dvh-80px)] flex-col gap-4 p-4 md:flex-row'>
			<Skeleton className='flex-1' />
			<Skeleton className='flex-1' />
		</div>
	);
};
export default Loading;
