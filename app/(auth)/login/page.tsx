'use client';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { Card } from '@/shadcn/card';
import { LoginForm } from '@/components/form/login-form';

const Login = () => {
    const { push } = useRouter();
    const { status } = useSession();

    if (status === 'authenticated') {
        push('/dashboard');
    }

    return (
        <div className='flex min-h-[calc(100vh-80px)] items-center justify-center bg-white p-4 dark:bg-[#131110]'>
            <Card className='w-auto md:w-[512px]'>
                <LoginForm />
            </Card>
        </div>
    );
};
export default Login;
