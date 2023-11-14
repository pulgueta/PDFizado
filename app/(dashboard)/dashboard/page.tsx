import { redirect } from 'next/navigation';

import { User } from '@prisma/client';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import { db } from '~/database/db';
import { authOptions } from '~/lib/auth';

const DashboardRedirect = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    const { id } = (await db.user.findUnique({
        where: {
            email: session?.user?.email,
        },
    })) as User;

    if (session !== null && session.user?.email !== '') {
        redirect(`/dashboard/${id}`);
    }

    return (
        <div className='flex min-h-[calc(100vh-80px)] items-center justify-center'>
            <p className='text-center text-2xl font-bold'>
                Redirigiendo a tu dashboard...
            </p>
        </div>
    );
};

export default DashboardRedirect;
