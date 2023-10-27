import { redirect } from 'next/navigation';

import { User } from '@prisma/client';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import { db } from '@/database/db';
import { authOptions } from '@/lib/auth';

const DashboardRedirect = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (session === null || session.user?.email === '') {
        redirect('/login');
    }

    const { id } = (await db.user.findUnique({
        where: {
            email: session.user?.email as string,
        },
    })) as User;

    if (session !== null && session.user?.email !== '') {
        redirect(`/dashboard/${id}`);
    } else {
        redirect('/login');
    }
};

export default DashboardRedirect;
