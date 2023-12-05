import Link from 'next/link';

import { footerRoutes } from '~/constants/navbar';

export const Footer = () => {
	return (
		<footer className='flex h-full w-full flex-col gap-8 border-t bg-secondary p-8 dark:bg-[#0C0A09] md:flex-row md:items-center md:justify-between lg:justify-evenly'>
			<Link
				href='/'
				aria-label='PDFizado - Inicio'
				className='text-4xl font-black text-black dark:text-white md:text-5xl lg:text-6xl'
			>
				<span className='text-primary'>PDF</span>izado
			</Link>

			<nav>
				<ul className='space-y-6 text-right md:flex md:items-center md:space-x-6 md:space-y-0'>
					{footerRoutes.map((route) => (
						<li
							key={route.label}
							className='text-xs text-muted-foreground transition-colors duration-200 ease-in-out hover:text-primary-foreground'
						>
							<Link href={route.href}>{route.label}</Link>
						</li>
					))}
					<li>
						<p className='py-4 text-center text-xs text-muted-foreground'>
							&copy; Copyright{' '}
							<Link
								href='https://www.linkedin.com/in/and-rodr/'
								target='_blank'
							>
								Andrés Rodríguez
							</Link>{' '}
							{new Date().getFullYear()}
						</p>
					</li>
				</ul>
			</nav>
		</footer>
	);
};
