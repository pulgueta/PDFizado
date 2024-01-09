import { File } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const usePDF = () => {
	const query = useQuery<File[]>({
		queryKey: ['files'],
		queryFn: () => {
			const data = fetch('/api/pdf').then((res) => res.json());

			return data;
		},
	});

	return query;
};
