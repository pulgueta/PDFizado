import Link from 'next/link';

import { MenuIcon } from 'lucide-react';

import { ThemeSwitcher } from '~/shadcn/theme-switcher';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '~/shadcn/sheet';
import { Button } from '~/shadcn/button';
import { DesktopRoutes, MobileRoutes } from './routes';
import { auth } from '~/lib/auth';
import { CountrySelector } from './country-selector';

export const Navbar = async () => {
	const user = await auth();

	return (
		<header className='sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-white/80 px-4 backdrop-blur dark:bg-[#0C0A09]/80 md:px-6 lg:px-16 xl:px-40 2xl:px-64'>
			<Link
				href='/'
				aria-label='PDFizado - Inicio'
				className='text-3xl font-black text-black dark:text-white md:text-4xl'
			>
				<span className='text-primary'>PDF</span>izado
			</Link>
			<nav className='flex items-center gap-x-4 md:gap-x-6'>
				<DesktopRoutes />
				<ThemeSwitcher />
				<CountrySelector />
				<Sheet>
					<SheetTrigger asChild className='flex md:hidden'>
						<Button
							size='icon'
							aria-label='Mobile navbar menu button'
						>
							<MenuIcon aria-label='Mobile navbar menu button' />
						</Button>
					</SheetTrigger>
					<SheetContent className='bg-white dark:bg-[#1C1917]'>
						{user?.user && (
							<SheetHeader className='mb-4'>
								<SheetTitle className='text-left text-2xl font-bold tracking-tight'>
									Hola, {user.user.name}
								</SheetTitle>
							</SheetHeader>
						)}
						<MobileRoutes />
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
};
