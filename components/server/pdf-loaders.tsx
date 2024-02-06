import { Grid } from '@radix-ui/themes';

import { Skeleton } from '~/shadcn/skeleton';

import '@radix-ui/themes/styles.css';

export const PDFLoader = () => (
	<Grid
		columns={{ initial: '1', md: '2', lg: '3' }}
		style={{
			gap: 16,
			margin: '16px 0px',
		}}
	>
		{Array.from({ length: 3 }, (_, i) => (
			<div
				key={i}
				className='mx-auto w-full rounded-2xl border p-4 md:w-96'
			>
				<Skeleton className='mb-4 h-10' />

				<Skeleton className='mb-2 h-6' />

				<hr className='mb-4 mt-6' />
				<div className='flex items-center justify-between'>
					<Skeleton className='h-10 w-1/3' />
					<Skeleton className='h-10 w-1/3' />
				</div>
			</div>
		))}
	</Grid>
);
