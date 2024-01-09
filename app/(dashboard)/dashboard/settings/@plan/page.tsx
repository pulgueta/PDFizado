import Link from 'next/link';

import { Card, CardContent, CardFooter } from '~/shadcn/card';
import { CurrentPlan } from './_components/current-plan';
import { UpgradeButton } from './_components/upgrade-button';
import { CardHeader } from '~/components/server/settings/card-header';
import { currentUser } from '~/lib/auth/currentUser';

const Plan = async () => {
	const user = await currentUser();

	if (!user) return;

	return (
		<Card className='container max-w-md px-0'>
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
					<UpgradeButton />
				) : (
					<span className='text-sm font-normal leading-tight text-muted-foreground'>
						Si quieres cancelar o modificar tu suscripción actual,
						deberás manejarla en{' '}
						<Link
							target='_blank'
							href='https://www.mercadopago.com.co/subscriptions'
							className='font-medium text-primary'
						>
							MercadoPago
						</Link>
					</span>
				)}
			</CardFooter>
		</Card>
	);
};
export default Plan;
