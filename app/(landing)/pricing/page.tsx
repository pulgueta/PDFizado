import { Metadata } from 'next';

import { PriceCard } from '~/components/client/prices/card-details';
import { currentUser } from '~/lib/auth/currentUser';
import { getSubscriptions } from '~/lib/products/get-plans';

export const metadata: Metadata = {
	title: 'Precios',
	description: 'Conoce los precios de PDFizado',
};

const Pricing = async () => {
	const plansPromise = getSubscriptions();
	const userPromise = currentUser();

	const [user, plans] = await Promise.all([userPromise, plansPromise]);

	return (
		<div className='relative min-h-[calc(100dvh-205px)] bg-white p-4 dark:bg-[#1C1917]'>
			<h3 className='mb-8 text-balance text-center text-4xl font-black tracking-tight text-black dark:text-white md:mb-16 md:text-5xl'>
				Tenemos 3 planes para que puedas utilizar{' '}
				<span className='text-primary'>PDF</span>izado
			</h3>
			<div className='container'>
				<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
					{plans.map((plan) => (
						<PriceCard
							{...plan}
							email={user?.email!}
							key={plan.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default Pricing;
