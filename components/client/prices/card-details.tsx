'use client';

import { FC } from 'react';

import Link from 'next/link';

import { Plan, Plans } from '@prisma/client';
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
import { Badge } from '~/shadcn/badge';
import { cn } from '~/lib/utils';
import { useCountry } from '~/hooks/use-country';

type PriceCardMetadata = Plans & {
	email: string;
	user_plan: Plan;
};

export const PriceCard: FC<PriceCardMetadata> = ({
	benefits,
	description,
	email,
	id,
	lemonSqueezyHref,
	monthlyPrice,
	name,
	plan,
	user_plan,
}) => {
	const country = useCountry();

	const formattedPrice = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
	});

	const isColombia = country?.country.iso_code === 'CO';

	const paddle = '/dashboard/settings';
	const lemonSqueezy =
		lemonSqueezyHref === ''
			? '/dashboard/settings'
			: `${lemonSqueezyHref}?checkout[email]=${email}`;

	const href = isColombia ? lemonSqueezy : paddle;

	const url = email !== undefined ? href : '/login';

	return (
		<Card
			className={cn(
				'mx-auto w-full bg-neutral-50 dark:bg-[#131110] sm:w-96 md:w-[25rem]',
				{
					'relative border-2 border-primary': plan === user_plan,
				}
			)}
			key={id}
		>
			{plan === user_plan && (
				<Badge className='absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1/2'>
					Plan actual
				</Badge>
			)}
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
						className: cn('mb-6 w-full', {
							'pointer-events-none opacity-50':
								plan === user_plan,
						}),
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
