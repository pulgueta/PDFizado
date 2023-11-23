import { redirect } from 'next/navigation';

import { User } from '@prisma/client';

import { db } from '~/database/db';
import { auth } from '~/lib/auth';

const DashboardRedirect = async () => {
	const session = await auth();

	const { id } = (await db.user.findUnique({
		where: {
			email: session?.user?.email,
		},
	})) as User;

	if (session !== null && session.user?.email !== '') {
		redirect(`/dashboard/${id}`);
	}
};

export default DashboardRedirect;
