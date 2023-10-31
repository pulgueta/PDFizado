import { redirect } from 'next/navigation';

import { Session, getServerSession } from 'next-auth';

import { Card } from '~/shadcn/card';
import { RegisterForm } from '~/components/form/register-form';
import { authOptions } from '~/lib/auth';

const Register = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (session !== null) {
        redirect('/dashboard');
    }

    return (
        <div className='flex min-h-[calc(100vh-80px)] items-center justify-center bg-white p-4 dark:bg-[#131110]'>
            <Card className='w-full md:w-[640px]'>
                <RegisterForm />
            </Card>
        </div>
    );
};
export default Register;
