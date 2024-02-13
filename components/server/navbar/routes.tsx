import Link from 'next/link';

import { SheetTrigger } from '~/shadcn/sheet';
import { noAuthRoutes } from '~/constants/navbar';
import { buttonVariants } from '~/components/ui/button';

export const DesktopRoutes = () => {
	return (
		<ul className='hidden md:flex md:items-center md:gap-x-6'>
			{noAuthRoutes.map(({ href, label }) => (
				<li key={href}>
					<Link
						href={href}
						prefetch={false}
						id={href.replace('/', '')}
						aria-label={label}
						className={buttonVariants({
							variant: 'ghost',
							className: 'text-lg',
						})}
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
							prefetch={false}
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
