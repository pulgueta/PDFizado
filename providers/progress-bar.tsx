'use client';

import { PropsWithChildren, Suspense } from 'react';

import { AppProgressBar } from 'next-nprogress-bar';

export const ProgressProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<Suspense fallback={<></>}>
				<AppProgressBar
					options={{ showSpinner: false }}
					color='#e11d48'
					shallowRouting
				/>
			</Suspense>
		</>
	);
};
