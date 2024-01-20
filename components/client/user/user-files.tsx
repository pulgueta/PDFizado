import { FC } from 'react';

import { Grid } from '@radix-ui/themes';
import { File } from '@prisma/client';

import { PDFCard } from '~/components/client/user/pdf-card';
import { PaginationLinks } from './pagination-links';

import '@radix-ui/themes/styles.css';

type Files = {
	files: File[];
	page: number;
	totalPages: number;
	hasNextPage: boolean;
};

export const UserFiles: FC<Files> = ({
	files,
	page,
	hasNextPage,
	totalPages,
}) => {
	if (files && files.length === 0) {
		return (
			<div className='mt-8 w-full rounded-lg border px-4 py-8'>
				<p className='text-center text-base font-semibold'>
					No tienes PDFs
				</p>
			</div>
		);
	}

	return (
		<section className='flex min-h-[calc(100dvh-421px)] flex-col justify-between gap-2'>
			<Grid
				columns={{ initial: '1', md: '2', lg: '3' }}
				style={{
					gap: 16,
					margin: '16px 0px',
				}}
			>
				{files.map((file) => (
					<PDFCard key={file.awsKey} {...file} />
				))}
			</Grid>
			<PaginationLinks
				hasNextPage={hasNextPage}
				totalPages={totalPages}
				page={page}
			/>
		</section>
	);
};
