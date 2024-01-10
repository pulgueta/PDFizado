import { Card, CardContent } from '~/shadcn/card';

import { CardHeader } from '~/components/server/settings/card-header';
import { currentUser } from '~/lib/auth/currentUser';
import { Form } from './_components/help-form';

const Plan = async () => {
	const user = await currentUser();

	if (!user) return;

	return (
		<Card className='container max-w-md px-0'>
			<CardHeader
				title='Soporte al usuario'
				description='Si presentas problemas con tu plan actual o con PDFizado, por favor, rellena el siguiente formulario.'
			/>

			<CardContent>
				<Form email={user.email!} />
			</CardContent>
		</Card>
	);
};
export default Plan;
