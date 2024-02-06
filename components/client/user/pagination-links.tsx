import { UrlObject } from 'node:url';

import { FC } from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '~/shadcn/pagination';
import { cn } from '~/lib/utils';

type Pagination = {
	page: number;
	totalPages: number;
	hasNextPage: boolean;
};

export const PaginationLinks: FC<Pagination> = ({
	page,
	totalPages,
	hasNextPage,
}) => {
	return (
		<Pagination className='mb-4'>
			<PaginationContent>
				<PaginationItem
					className={cn({
						'pointer-events-none opacity-80': page === 1,
					})}
				>
					<PaginationPrevious href={`?page=${page - 1}`} />
				</PaginationItem>
				{Array.from({ length: totalPages }).map((_, i) => (
					<PaginationLink
						key={i}
						href={page === 1 ? '/dashboard' : `?page=${i + 1}`}
						isActive={page === i + 1}
						prefetch={false}
					>
						{i + 1}
					</PaginationLink>
				))}
				{totalPages >= 5 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem
					className={cn({
						'pointer-events-none opacity-80': !hasNextPage,
					})}
				>
					<PaginationNext
						prefetch={false}
						href={
							`${
								hasNextPage ? `?page=${page + 1}` : ''
							}` as unknown as UrlObject
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
