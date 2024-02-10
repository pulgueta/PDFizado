'use client';

import { FC } from 'react';

import { LemonSqueezyButtons } from './lemon-squeezy-buttons';
import { PaddleButtons } from './paddle-buttons';
import { useCountry } from '~/hooks/use-country';
import { $PayButton } from './button-types';

export const PayButton: FC<$PayButton> = ({ plans, user }) => {
	const country = useCountry();

	const isColombia = country?.country.iso_code === 'CO';

	return isColombia ? (
		<LemonSqueezyButtons user={user} plans={plans} />
	) : (
		<PaddleButtons plans={plans} user={user} />
	);
};
