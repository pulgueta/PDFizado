import Link from 'next/link';

import { MenuIcon } from 'lucide-react';

import { ThemeSwitcher } from '~/shadcn/theme-switcher';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '~/shadcn/sheet';
import { Button } from '~/shadcn/button';
import { authRoutes } from '~/constants/navbar';
import { SignOut, SignOutMobile } from './sign-out';
import { auth } from '~/lib/auth';

export const Navbar = async () => {
	const session = await auth();

	return (
		<header className='sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-white/80 px-4 backdrop-blur dark:bg-[#0C0A09]/80 md:px-8 lg:px-16 xl:px-40 2xl:px-64'>
			<Link
				href='/'
				aria-label='PDFizado - Inicio'
				className='text-3xl font-black text-black dark:text-white md:text-4xl'
			>
				<span className='text-primary'>PDF</span>izado
			</Link>
			<nav className='flex items-center gap-x-6 md:gap-x-12'>
				<ul className='hidden md:flex md:items-center md:gap-x-6 lg:gap-x-12'>
					{authRoutes.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								aria-label={label}
								className='text-center font-semibold duration-200 ease-in-out hover:text-primary'
							>
								{label}
							</Link>
						</li>
					))}
					<SignOut />
				</ul>
				<ThemeSwitcher />
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
						<SheetHeader className='mb-4 text-left'>
							<SheetTitle className='text-3xl font-bold tracking-tight'>
								Hola, {session?.user.name}
							</SheetTitle>
						</SheetHeader>

						<ul className='space-y-4'>
							{authRoutes.map(({ href, label }) => (
								<li key={href}>
									<SheetTrigger asChild>
										<Link
											href={href}
											aria-label={label}
											className='text-center text-lg font-semibold leading-loose duration-200 ease-in-out hover:text-primary'
										>
											{label}
										</Link>
									</SheetTrigger>
								</li>
							))}
						</ul>

						<SheetFooter className='mt-4'>
							<SignOutMobile />
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
};
