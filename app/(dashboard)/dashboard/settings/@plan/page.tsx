import { Card, CardContent, CardFooter } from '~/shadcn/card';
import { CurrentPlan } from './components/current-plan';
import { CardHeader } from '~/components/server/settings/card-header';
import { currentUser } from '~/lib/auth/currentUser';
import { PayButton } from './components/pay-button';
import { getPaidSubscriptions } from '~/lib/products/get-plans';
import { ManageSubscription } from './components/manage-subscription';

const Plan = async () => {
	const plansPromise = getPaidSubscriptions();
	const userPromise = currentUser();

	const [user, plans] = await Promise.all([userPromise, plansPromise]);

	if (!user) return;

	return (
		<Card className='container max-w-lg px-0'>
			<CardHeader
				title='Plan'
				description='Manten tu plan actual o mejóralo para obtener beneficios.'
			/>

			<CardContent>
				<p>
					Tu plan actual es: <CurrentPlan plan={user.plan} />
				</p>
			</CardContent>
			<CardFooter className='flex flex-col items-center justify-between gap-4'>
				{user.plan === 'FREE' ? (
					<PayButton user={user} plans={plans} />
				) : (
					<ManageSubscription user={user} plans={plans} />
				)}
			</CardFooter>
		</Card>
	);
};
export default Plan;
