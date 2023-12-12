import { redirect } from 'next/navigation';

import { auth } from '~/lib/auth';

const LandingLayout = async ({ children }: any) => {
	const session = await auth();

	if (session) {
		redirect('/dashboard');
	} else {
		return children;
	}
};

export default LandingLayout;
