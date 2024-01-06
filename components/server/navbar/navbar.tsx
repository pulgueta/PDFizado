import Link from 'next/link';

import { ThemeSwitcher } from '~/shadcn/theme-switcher';

import { Profile } from '~/components/server/navbar/profile';
import { currentUser } from '~/lib/auth/currentUser';
import { DesktopRoutes } from './routes';
import { MobileMenu } from './mobile-menu';

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
				{!user && <MobileMenu />}
			</nav>
		</nav>
	);
};
