import { redirect } from 'next/navigation';

import { currentUser } from '~/lib/auth/currentUser';

const LandingLayout = async ({ children }: any) => {
	const session = await currentUser();

	if (session) {
		redirect('/dashboard');
	} else {
		return children;
	}
};

export default LandingLayout;
