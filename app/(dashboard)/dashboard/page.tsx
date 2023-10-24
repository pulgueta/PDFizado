import { redirect } from 'next/navigation';

import { User as PrismaUser } from '@prisma/client';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import { db } from '@/database/db';
import { authOptions } from '@/lib/auth';

const DashboardRedirect = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user) {
        redirect('/login');
    }

    const { id } = (await db.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    })) as PrismaUser;

    session.user ? redirect(`/dashboard/${id}`) : redirect('/login');

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <p className='text-2xl font-bold'>Redireccionando...</p>
        </div>
    );
};

export default DashboardRedirect;
