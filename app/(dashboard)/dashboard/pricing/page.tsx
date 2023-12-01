import { PriceCards } from '~/components/client/prices/card-details';

const Pricing = () => {
	return (
		<div className='relative min-h-[calc(100vh-205px)] bg-white p-4 dark:bg-[#1C1917]'>
			<div className='mx-auto my-8 max-w-5xl'>
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
