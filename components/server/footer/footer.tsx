'use client';

import Link from 'next/link';

import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { footerRoutes } from '~/constants/navbar';
import { Button, buttonVariants } from '~/shadcn/button';
import { cn } from '~/lib/utils';

export const Footer = () => {
	const { setTheme, theme } = useTheme();

	return (
		<footer className='flex h-full w-full flex-col items-center gap-8 border-t bg-secondary p-8 md:flex-row md:justify-between lg:justify-around dark:bg-[#0C0A09]'>
			<Link
				href='/'
				aria-label='PDFizado - Inicio'
				className='text-5xl font-black tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white'
			>
				<span className='text-primary'>PDF</span>izado
			</Link>

			<nav className='flex w-full flex-col items-end md:w-auto lg:flex-row lg:items-center'>
				<ul className='flex flex-col items-end gap-2 lg:flex-row lg:items-center'>
					{footerRoutes.map((route) => (
						<li key={route.label}>
							<Link
								href={route.href}
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
				<div className='space-x-2'>
					<Button
						className={cn('hover:bg-secondary-foreground/10', {
							'bg-secondary-foreground/10': theme === 'light',
						})}
						size='icon'
						variant='ghost'
						onClick={() => setTheme('light')}
					>
						<SunIcon
							aria-label='Toggle light theme'
							className='h-4 w-4'
						/>
					</Button>
					<Button
						className={cn('hover:bg-secondary-foreground/10', {
							'bg-secondary-foreground/10': theme === 'dark',
						})}
						size='icon'
						variant='ghost'
						onClick={() => setTheme('dark')}
					>
						<MoonIcon
							aria-label='Toggle dark theme'
							className='h-4 w-4'
						/>
					</Button>
					<Button
						className={cn('hover:bg-secondary-foreground/10', {
							'bg-secondary-foreground/10': theme === 'system',
						})}
						size='icon'
						variant='ghost'
						onClick={() => setTheme('system')}
					>
						<LaptopIcon
							aria-label='Set system theme'
							className='h-4 w-4'
						/>
					</Button>
				</div>
			</nav>
		</footer>
	);
};
