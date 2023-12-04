import { redirect } from 'next/navigation';
import Link from 'next/link';

import { User } from '@prisma/client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';
import { db } from '~/database/db';
import { auth } from '~/lib/auth';
import { CurrentPlan } from './current-plan';
import { UpgradeButton } from './upgrade-button';

type PlanPage = {
	searchParams: { preapproval_id: string };
};

const Plan = async ({ searchParams }: PlanPage) => {
	const session = await auth();

	if (!session) {
		redirect('/login');
	}

	console.log(searchParams.preapproval_id);

	const { plan } = (await db.user.findUnique({
		where: {
			id: session?.user.id,
		},
	})) as User;

	return (
		<section className='min-h-[calc(100vh-205px)] px-4 py-8'>
			<Card className='mx-auto w-80 md:w-auto md:max-w-md'>
				<CardHeader>
					<CardTitle>Tu plan</CardTitle>
					<CardDescription>
						Aquí puedes ver el plan que tienes actualmente y
						cambiarlo si lo deseas.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						Tu plan actual es: <CurrentPlan plan={plan} />
					</p>
				</CardContent>
				<CardFooter className='flex flex-col items-center justify-between gap-4 md:flex-row'>
					{plan !== 'FREE' ? (
						<UpgradeButton />
					) : (
						<span className='text-sm font-normal leading-tight text-muted-foreground'>
							Si quieres cancelar o modificar tu suscripción
							actual, deberás manejarla en{' '}
							<Link
								href='https://www.mercadopago.com.co/subscriptions'
								className='font-medium text-primary'
							>
								MercadoPago
							</Link>
						</span>
					)}
				</CardFooter>
			</Card>
		</section>
	);
};
export default Plan;
