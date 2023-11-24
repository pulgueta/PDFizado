'use client';

import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { SheetFooter, SheetTrigger } from '~/shadcn/sheet';
import { Skeleton } from '~/shadcn/skeleton';
import { authRoutes, noAuthRoutes } from '~/constants/navbar';
import { SignOut, SignOutMobile } from './sign-out';

export const DesktopRoutes = () => {
	const { data, status } = useSession();
	return (
		<ul className='hidden md:flex md:items-center md:gap-x-6 lg:gap-x-12'>
			{status === 'loading' ? (
				<Skeleton className='h-10 w-96' />
			) : data?.user && status === 'authenticated' ? (
				authRoutes.map(({ href, label }) => (
					<li key={href}>
						<Link
							href={href}
							aria-label={label}
							className='text-center font-semibold duration-200 ease-in-out hover:text-primary'
						>
							{label}
						</Link>
					</li>
				))
			) : (
				noAuthRoutes.map(({ href, label }) => (
					<li key={href}>
						<Link
							href={href}
							aria-label={label}
							className='text-center font-semibold duration-200 ease-in-out hover:text-primary'
						>
							{label}
						</Link>
					</li>
				))
			)}
			{status === 'authenticated' && <SignOut />}
		</ul>
	);
};

export const MobileRoutes = () => {
	const { data, status } = useSession();
	return (
		<>
			<ul className='space-y-4'>
				{data?.user && status === 'authenticated'
					? authRoutes.map(({ href, label }) => (
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
					  ))
					: noAuthRoutes.map(({ href, label }) => (
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
			{status === 'authenticated' && (
				<SheetFooter className='mt-4'>
					<SignOutMobile />
				</SheetFooter>
			)}
		</>
	);
};
