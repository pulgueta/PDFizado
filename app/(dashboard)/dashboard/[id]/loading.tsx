import { Skeleton } from '~/components/ui/skeleton';

const Loading = () => {
	return (
		<main className='min-h-[calc(100vh-205px)]'>
			<div className='mx-auto max-w-7xl p-4'>
				<Skeleton className='h-10 w-80' />

				<div className='mt-8 flex w-full flex-col gap-y-4'>
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
				</div>
			</div>
		</main>
	);
};
export default Loading;
