'use client';

import { Grid } from '@radix-ui/themes';

import { PDFCard } from '~/components/client/user/pdf-card';
import { PDFLoader } from '~/components/server/pdf-loaders';

import '@radix-ui/themes/styles.css';
import { usePDF } from '~/hooks/user/use-pdf';

export const UserFiles = () => {
	const { data, error, isLoading, isSuccess } = usePDF();

	if (data && data.length === 0) {
		return (
			<div className='mt-8 w-full rounded-lg border px-4 py-8'>
				<p className='text-center text-base font-semibold'>
					No tienes PDFs
				</p>
			</div>
		);
	}

	if (error) {
		<div className='mt-8 flex w-[22rem] flex-col items-center gap-4 rounded-lg border p-4'>
			<p className='text-center text-lg font-semibold'>
				Error al cargar tus PDFs
			</p>
			<p className='text-center'>{error.name}</p>
			<p className='text-center'>{error.message}</p>
			<p className='text-center'>{error.stack}</p>
		</div>;
	}

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
		</Grid>
	);
};
