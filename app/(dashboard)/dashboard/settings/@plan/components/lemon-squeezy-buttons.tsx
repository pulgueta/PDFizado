import { UrlObject } from 'url';

import { FC } from 'react';

import Link from 'next/link';

import type { PaidSubscriptionPlans } from '~/lib/products/get-plans';
import type { CurrentUser } from '~/lib/auth/currentUser';
import { buttonVariants } from '~/shadcn/button';

type Buttons = {
	user: CurrentUser;
	plans: PaidSubscriptionPlans;
};

export const LemonSqueezyButtons: FC<Buttons> = async ({ plans, user }) => {
	return (
		<div className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
			{plans.map((plan) => {
				const href = `${
					plan.lemonSqueezyHref
				}?checkout[email]=${user?.email!}`;
				return (
					<Link
						key={plan.id}
						href={href as unknown as UrlObject}
						className={buttonVariants()}
					>
						Actualizar a {plan.name.toLowerCase()}
					</Link>
				);
			})}
		</div>
	);
};
