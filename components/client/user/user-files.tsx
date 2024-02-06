import { FC } from 'react';

import { Grid } from '@radix-ui/themes';

import { PDFCard } from '~/components/client/user/pdf-card';
import { db } from '~/database/db';
import { ExtendedUser } from '~/lib/auth/auth';
import { PaginationLinks } from './pagination-links';

import '@radix-ui/themes/styles.css';

type Files = {
	page: number;
	user: ExtendedUser;
	filesCount: number;
};

export const revalidate = 0;

export const UserFiles: FC<Files> = async ({ page, filesCount, user }) => {
	const take = 6;
	const skip = page <= 1 ? 0 : Math.abs(page - 1 * take);

	const files = await db.file.findMany({
		where: {
			userId: user?.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take,
		skip,
	});

	const totalPages = Math.ceil(filesCount / take);

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
				hasNextPage={skip + take < filesCount}
				totalPages={totalPages}
				page={page}
			/>
		</section>
	);
};
