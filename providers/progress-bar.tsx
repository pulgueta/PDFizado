'use client';

import { PropsWithChildren } from 'react';

import { AppProgressBar } from 'next-nprogress-bar';

export const ProgressProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<AppProgressBar
				options={{ showSpinner: false }}
				color='#e11d48'
				shallowRouting
			/>
		</>
	);
};
