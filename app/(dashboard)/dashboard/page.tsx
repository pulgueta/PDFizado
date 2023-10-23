import { redirect } from 'next/navigation';

import { User as PrismaUser } from '@prisma/client';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import { db } from '@/database/db';
import { authOptions } from '@/lib/auth';

const DashboardRedirect = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || !session.user) {
        redirect('/login');
    }

    const { id } = (await db.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    })) as PrismaUser;

    session ? redirect(`/dashboard/${id}`) : <h1>Loading...</h1>;
};

export default DashboardRedirect;
