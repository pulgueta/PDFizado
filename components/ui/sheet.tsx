'use client';

import type {
	ComponentPropsWithoutRef,
	ElementRef,
	HTMLAttributes,
} from 'react';
import { forwardRef } from 'react';

import {
	Root,
	Trigger,
	Close,
	Portal,
	Overlay,
	Content,
	Title,
	Description,
} from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '~/lib/utils';

const Sheet = Root;
const SheetTrigger = Trigger;
const SheetClose = Close;
const SheetPortal = Portal;

const SheetOverlay = forwardRef<
	ElementRef<typeof Overlay>,
	ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
	<Overlay
		className={cn(
			'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			className
		)}
		{...props}
		ref={ref}
	/>
));
SheetOverlay.displayName = Overlay.displayName;

const sheetVariants = cva(
	'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
	{
		variants: {
			side: {
				top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b',
				bottom: 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t',
				left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
				right: 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	}
);

interface SheetContentProps
	extends ComponentPropsWithoutRef<typeof Content>,
		VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<ElementRef<typeof Content>, SheetContentProps>(
	({ side = 'right', className, children, ...props }, ref) => (
		<SheetPortal>
			<SheetOverlay />
			<Content
				ref={ref}
				className={cn(sheetVariants({ side }), className)}
				{...props}
			>
				{children}
				<Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
					<X className='h-4 w-4' />
					<span className='sr-only'>Close</span>
				</Close>
			</Content>
		</SheetPortal>
	)
);
SheetContent.displayName = Content.displayName;

const SheetHeader = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col space-y-2 text-center sm:text-left',
			className
		)}
		{...props}
	/>
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className
		)}
		{...props}
	/>
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = forwardRef<
	ElementRef<typeof Title>,
	ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
	<Title
		ref={ref}
		className={cn('text-lg font-semibold text-foreground', className)}
		{...props}
	/>
));
SheetTitle.displayName = Title.displayName;

const SheetDescription = forwardRef<
	ElementRef<typeof Description>,
	ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
	<Description
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
));
SheetDescription.displayName = Description.displayName;

export {
	Sheet,
	SheetPortal,
	SheetOverlay,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
