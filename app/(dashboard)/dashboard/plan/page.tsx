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

const Plan = async () => {
	const session = await auth();

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
				{plan !== 'PROFESSIONAL' && (
					<CardFooter className='flex flex-col items-center justify-between gap-4 md:flex-row'>
						<UpgradeButton />
					</CardFooter>
				)}
			</Card>
		</section>
	);
};
export default Plan;
