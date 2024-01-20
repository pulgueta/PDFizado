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
	const currentPage = Math.min(Math.max(page, 1), totalPages);

	const pages = Array.from({ length: totalPages }) as [];

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
				{pages.map((_, i) => (
					<PaginationLink
						key={i}
						href={`?page=${i + 1}`}
						isActive={currentPage === i + 1}
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
						href={`${hasNextPage ? `?page=${page + 1}` : ''}`}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
