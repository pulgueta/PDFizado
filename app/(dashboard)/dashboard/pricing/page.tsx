import { Metadata } from 'next';

import { PriceCards } from '~/components/client/prices/card-details';

export const metadata: Metadata = {
	metadataBase: new URL('https://pdfizado.com/dashboard/pricing'),
	alternates: {
		canonical: '/dashboard/pricing',
	},
};

const Pricing = () => (
	<div className='relative min-h-[calc(100dvh-205px)] bg-white p-4 dark:bg-[#1C1917]'>
		<div className='mx-auto my-8 max-w-7xl'>
			<h3 className='mb-4 border-b pb-4 text-center text-4xl font-black text-black md:mb-8 dark:text-white'>
				Tenemos 3 planes para que puedas utilizar{' '}
				<span className='text-primary'>PDF</span>izado
			</h3>

			<PriceCards />
		</div>
	</div>
);

export default Pricing;
