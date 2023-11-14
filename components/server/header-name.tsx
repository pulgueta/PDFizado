import { useSession } from 'next-auth/react';

import { Skeleton } from '../ui/skeleton';

export const HeaderName = () => {
    const session = useSession();

    return session?.data?.user.name ? (
        <h1 className='mb-8 flex items-center gap-x-4 text-3xl font-bold md:text-4xl lg:text-5xl'>
            Dashboard de {session.data.user.name}
        </h1>
    ) : (
        <Skeleton className='mb-8 h-10 w-80 md:w-96' />
    );
};
