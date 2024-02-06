'use client';

import { UrlObject } from 'node:url';

import Link from 'next/link';

import { footerRoutes } from '~/constants/navbar';
import { buttonVariants } from '~/shadcn/button';

export const Footer = () => {
	return (
		<footer className='flex h-full w-full flex-col items-center gap-8 border-t bg-secondary p-8 dark:bg-[#0C0A09] md:flex-row md:justify-between lg:justify-around'>
			<Link
				href='/'
				aria-label='PDFizado - Inicio'
				className='text-4xl font-black tracking-tight text-black dark:text-white md:text-5xl lg:text-6xl'
			>
				<span className='text-primary'>PDF</span>izado
			</Link>

			<nav className='flex w-full flex-col items-end md:w-auto lg:flex-row lg:items-center'>
				<ul className='flex flex-col items-end gap-2 lg:flex-row lg:items-center'>
					{footerRoutes.map((route) => (
						<li key={route.label}>
							<Link
								href={route.href as unknown as UrlObject}
								className={buttonVariants({
									variant: 'link',
									className:
										'text-xs text-secondary-foreground',
									size: 'sm',
								})}
							>
								{route.label}
							</Link>
						</li>
					))}
				</ul>
				<Link
					href='https://afrodriguez.tech/'
					target='_blank'
					className={buttonVariants({
						variant: 'link',
						className: 'text-xs text-secondary-foreground',
						size: 'sm',
					})}
				>
					Copyright Andrés R. {new Date().getFullYear()}
				</Link>
			</nav>
		</footer>
	);
};
