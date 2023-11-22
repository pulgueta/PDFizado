import { useSession } from 'next-auth/react';

import { Skeleton } from '../ui/skeleton';

export const HeaderName = () => {
	const session = useSession();

	return session?.data?.user.name ? (
		<h1 className='mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
			Dashboard de {session.data.user.name}
		</h1>
	) : (
		<Skeleton className='mb-8 h-10 w-80 md:w-96' />
	);
};
