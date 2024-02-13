import { FC } from 'react';

import { Grid } from '@radix-ui/themes';
import { File } from '@prisma/client';

import { PDFCard } from '~/components/client/user/pdf-card';
import { PaginationLinks } from './pagination-links';

import '@radix-ui/themes/styles.css';

type Files = {
	page: number;
	filesCount: number;
	files: File[];
	skip: number;
	take: number;
	totalPages: number;
};

export const revalidate = 0;

export const UserFiles: FC<Files> = async ({
	page,
	filesCount,
	files,
	skip,
	take,
	totalPages,
}) => {
	const hasNextPage = skip + take < filesCount;

	if (filesCount === 0) {
		return (
			<div className='mt-8 w-full rounded-lg border px-4 py-8 md:py-12'>
				<p className='text-center text-base font-semibold md:text-lg'>
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
				{files?.map((file) => <PDFCard key={file.awsKey} {...file} />)}
			</Grid>
			<PaginationLinks
				hasNextPage={hasNextPage}
				totalPages={totalPages}
				page={page}
			/>
		</section>
	);
};
