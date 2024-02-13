import { FC } from 'react';

import Link from 'next/link';

import { buttonVariants } from '~/shadcn/button';
import { $PayButton } from './button-types';

export const ManageSubscription: FC<$PayButton> = () => {
	return (
		<Link
			href='https://pdfizado.lemonsqueezy.com/billing'
			className={buttonVariants()}
		>
			Configuración de suscripción
		</Link>
	);
};
