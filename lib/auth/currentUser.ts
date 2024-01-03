import { auth } from './auth';

export const currentUser = async () => {
	const user = await auth();

	if (!user) return;

	return user.user;
};
