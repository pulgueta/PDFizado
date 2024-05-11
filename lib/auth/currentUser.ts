import { cache } from 'react';

import { auth } from './auth';

export const currentUser = cache(async () => {
	const user = await auth();

	if (!user) return;

	return user.user;
});

export type CurrentUser = Awaited<ReturnType<typeof currentUser>>;
