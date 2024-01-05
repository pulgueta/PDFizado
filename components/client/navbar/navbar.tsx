import Link from 'next/link';

import { MenuIcon } from 'lucide-react';

import { ThemeSwitcher } from '~/shadcn/theme-switcher';
import { Sheet, SheetContent, SheetTrigger } from '~/shadcn/sheet';
import { Button } from '~/shadcn/button';
import { DesktopRoutes, MobileRoutes } from './routes';
import { Profile } from '~/components/server/navbar/profile';
import { currentUser } from '~/lib/auth/currentUser';

export const Navbar = async () => {
	const user = await currentUser();

	return (
		<nav className='sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-white/80 px-4 backdrop-blur md:px-6 lg:justify-around dark:bg-[#0C0A09]/80'>
			<Link
				href={!user ? '/' : '/dashboard'}
				aria-label='PDFizado - Inicio'
				id='branding'
				className='text-3xl font-black tracking-tight text-black md:text-4xl dark:text-white'
			>
				<span className='text-primary'>PDF</span>izado
			</Link>
			<nav className='flex items-center gap-x-4 md:gap-x-6'>
				{user ? <Profile {...user} /> : <DesktopRoutes />}
				<ThemeSwitcher />
				{!user && (
					<Sheet>
						<SheetTrigger
							asChild
							className='flex md:hidden'
							id='navbar-btn'
						>
							<Button
								size='icon'
								aria-label='Mobile navbar menu button'
							>
								<MenuIcon />
							</Button>
						</SheetTrigger>
						<SheetContent className='bg-white dark:bg-[#1C1917]'>
							<MobileRoutes />
						</SheetContent>
					</Sheet>
				)}
			</nav>
		</nav>
	);
};
