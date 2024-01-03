import Link from 'next/link';

import { SheetTrigger } from '~/shadcn/sheet';
import { noAuthRoutes } from '~/constants/navbar';

export const DesktopRoutes = () => {
	return (
		<ul className='hidden md:flex md:items-center md:gap-x-6 lg:gap-x-12'>
			{noAuthRoutes.map(({ href, label }) => (
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
		</ul>
	);
};

export const MobileRoutes = () => {
	return (
		<ul className='space-y-4'>
			{noAuthRoutes.map(({ href, label }) => (
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
	);
};
