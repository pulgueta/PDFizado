import { redirect } from 'next/navigation';

import { Session, getServerSession } from 'next-auth';

import { LoginForm } from '~/components/client/form/login-form';
import { authOptions } from '~/lib/auth';

const Login = async () => {
	const session = (await getServerSession(authOptions)) as Session | null;

	if (session !== null) {
		redirect('/dashboard');
	}

	return (
		<div className='flex min-h-[calc(100vh-205px)] items-center justify-center bg-white p-4 dark:bg-[#131110]'>
			<LoginForm />
		</div>
	);
};
export default Login;
