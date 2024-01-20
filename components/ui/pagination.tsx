import { ComponentProps, forwardRef } from 'react';

import Link from 'next/link';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '~/lib/utils';
import { ButtonProps, buttonVariants } from '~/shadcn/button';

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => (
	<nav
		role='navigation'
		aria-label='pagination'
		className={cn('mx-auto flex w-full justify-center', className)}
		{...props}
	/>
);
Pagination.displayName = 'Pagination';

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
	({ className, ...props }, ref) => (
		<ul
			ref={ref}
			className={cn('flex flex-row items-center gap-1', className)}
			{...props}
		/>
	)
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
	({ className, ...props }, ref) => (
		<li ref={ref} className={cn('', className)} {...props} />
	)
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
	ComponentProps<typeof Link>;

const PaginationLink = ({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps) => (
	<Link
		aria-current={isActive ? 'page' : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? 'outline' : 'ghost',
				size,
			}),
			className
		)}
		{...props}
	/>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
	className,
	...props
}: ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label='Go to previous page'
		size='icon'
		className={cn('', className)}
		{...props}
	>
		<ChevronLeft className='size-4' />
	</PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
	className,
	...props
}: ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label='Go to next page'
		size='icon'
		className={cn('', className)}
		{...props}
	>
		<ChevronRight className='size-4' />
	</PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
	className,
	...props
}: ComponentProps<'span'>) => (
	<span
		aria-hidden
		className={cn('flex size-9 items-center justify-center', className)}
		{...props}
	>
		<MoreHorizontal className='size-4' />
		<span className='sr-only'>More pages</span>
	</span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
