'use client';

import { Grid } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { File } from '@prisma/client';

import { PDFCard } from '~/components/client/pdf-card';
import { PDFLoader } from '~/components/server/pdf-loaders';

import '@radix-ui/themes/styles.css';

export const UserFiles = () => {
	const { data, error, isLoading, isSuccess } = useQuery<File[]>({
		queryKey: ['files'],
		queryFn: () => {
			const data = fetch('/api/files').then((res) => res.json());

			return data;
		},
	});

	return (
		<Grid
			columns={{ initial: '1', md: '2', lg: '3' }}
			style={{
				gap: 16,
				margin: '32px 0px',
			}}
		>
			{isLoading && <PDFLoader />}

			{isSuccess &&
				data.length > 0 &&
				data.map((file) => (
					<PDFCard
						key={file.awsKey}
						awsKey={file.awsKey}
						createdAt={file.createdAt}
						name={file.name}
						id={file.id}
						updatedAt={file.updatedAt}
						userId={file.userId}
						url={file.url}
					/>
				))}

			{data && data.length === 0 && (
				<div className='w-full rounded-lg border p-4'>
					<p className='text-center text-base font-semibold'>
						No tienes PDFs
					</p>
				</div>
			)}
			{error && (
				<div className='flex w-[22rem] flex-col items-center gap-4 rounded-lg border p-4'>
					<p className='text-center text-lg font-semibold'>
						Error al cargar tus PDFs
					</p>
					<p className='text-center'>{error.name}</p>
					<p className='text-center'>{error.message}</p>
					<p className='text-center'>{error.stack}</p>
				</div>
			)}
		</Grid>
	);
};
