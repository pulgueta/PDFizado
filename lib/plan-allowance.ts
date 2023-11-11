import { Session, getServerSession } from 'next-auth';
import { User } from '@prisma/client';

import { authOptions } from './auth';
import { db } from '~/database/db';

export const maxSizeAllowed = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    const { plan } = (await db.user.findUnique({
        where: {
            id: session?.user.id,
        },
    })) as User;

    switch (plan) {
        case 'FREE':
            return 8388608; //! 8 * 1024 * 1024 * 8
        case 'FREE':
            return 16777216; //! 8 * 1024 * 1024 * 16
        case 'FREE':
            return 33554432; //! 8 * 1024 * 1024 * 32
        default:
            return 8388608;
    }
};
