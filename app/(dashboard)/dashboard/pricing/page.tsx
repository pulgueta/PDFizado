import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { PriceCards } from '~/components/client/prices/card-details';
import { auth } from '~/lib/auth';

export const metadata: Metadata = {
	metadataBase: new URL(
		`http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
			process.env.NODE_ENV === 'production'
				? 'pdfizado.com'
				: 'localhost:3000'
		}/dashboard/pricing`
	),
	alternates: {
		canonical: '/dashboard/pricing',
	},
};

const Pricing = async () => {
	const session = await auth();

	if (!session) {
		redirect('/login');
	}

	return (
		<div className='relative min-h-[calc(100vh-205px)] bg-white p-4 dark:bg-[#1C1917]'>
			<div className='mx-auto my-8 max-w-7xl'>
				<h3 className='mb-4 border-b pb-4 text-center text-4xl font-black text-black dark:text-white md:mb-8'>
					Tenemos 3 planes para que puedas utilizar{' '}
					<span className='text-primary'>PDF</span>izado
				</h3>

				<PriceCards />
			</div>
		</div>
	);
};
export default Pricing;
