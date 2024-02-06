import { FC } from 'react';

import Link from 'next/link';

import { Plans } from '@prisma/client';
import { CheckIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';
import { Separator } from '~/shadcn/separator';
import { buttonVariants } from '~/shadcn/button';

type PriceCardMetadata = Plans & {
	email: string;
};

export const PriceCard: FC<PriceCardMetadata> = ({
	benefits,
	description,
	email,
	id,
	lemonSqueezyHref,
	monthlyPrice,
	name,
}) => {
	const formattedPrice = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
	});

	const href =
		lemonSqueezyHref === ''
			? '/dashboard/settings'
			: `${lemonSqueezyHref}?checkout[email]=${email}`;

	const url = email !== undefined ? href : '/login';

	return (
		<Card
			className='mx-auto w-full bg-neutral-50 dark:bg-[#131110] sm:w-96 md:w-[25rem]'
			key={id}
		>
			<CardHeader>
				<CardTitle className='text-4xl font-bold'>{name}</CardTitle>
				<CardDescription className='text-pretty text-muted-foreground'>
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className='h-full'>
				<span className='block text-center text-5xl font-bold'>
					{monthlyPrice === 0
						? 'Sin costo'
						: formattedPrice
								.format(monthlyPrice)
								.replace(',00', '')}
				</span>
				<Separator className='my-6' />
				<Link
					href={url}
					className={buttonVariants({
						className: 'mb-6 w-full',
						size: 'lg',
					})}
				>
					Adquirir
				</Link>
				<ul className='space-y-1.5 text-muted-foreground'>
					{benefits.map((benefit, i) => (
						<li key={i}>
							<span className='flex items-center justify-start text-pretty text-sm md:text-base'>
								<CheckIcon
									className='mr-4 size-4 text-green-500'
									aria-label='Check'
								/>
								{benefit}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};
