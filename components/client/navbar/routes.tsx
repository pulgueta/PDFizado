import Link from 'next/link';

import { SheetFooter, SheetTrigger } from '~/shadcn/sheet';
import { authRoutes, noAuthRoutes } from '~/constants/navbar';
import { SignOut, SignOutMobile } from './sign-out';
import { currentUser } from '~/lib/auth/currentUser';

export const DesktopRoutes = async () => {
	const session = await currentUser();

	return (
		<ul className='hidden md:flex md:items-center md:gap-x-6 lg:gap-x-12'>
			{session
				? authRoutes.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								id={href.replace('/', '')}
								aria-label={label}
								className='text-center font-semibold duration-200 ease-in-out hover:text-primary'
							>
								{label}
							</Link>
						</li>
					))
				: noAuthRoutes.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								id={href.replace('/', '')}
								aria-label={label}
								className='text-center font-semibold duration-200 ease-in-out hover:text-primary'
							>
								{label}
							</Link>
						</li>
					))}

			{session && (
				<li>
					<SignOut />
				</li>
			)}
		</ul>
	);
};

export const MobileRoutes = async () => {
	const session = await currentUser();

	return (
		<>
			<ul className='space-y-4'>
				{session
					? authRoutes.map(({ href, label }) => (
							<li key={href}>
								<SheetTrigger asChild>
									<Link
										href={href}
										aria-label={label}
										id={href.replace('/', '')}
										className='text-center text-lg font-semibold leading-loose duration-200 ease-in-out hover:text-primary'
									>
										{label}
									</Link>
								</SheetTrigger>
							</li>
						))
					: noAuthRoutes.map(({ href, label }) => (
							<li key={href}>
								<SheetTrigger asChild>
									<Link
										href={href}
										aria-label={label}
										id={href.replace('/', '')}
										className='text-center text-lg font-semibold leading-loose duration-200 ease-in-out hover:text-primary'
									>
										{label}
									</Link>
								</SheetTrigger>
							</li>
						))}
			</ul>

			{session && (
				<SheetFooter className='mt-4'>
					<SignOutMobile />
				</SheetFooter>
			)}
		</>
	);
};
