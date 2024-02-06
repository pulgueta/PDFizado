import { useQuery } from '@tanstack/react-query';

export const usePDF = <T>({ skip }: { skip: number }) => {
	const query = useQuery<T[] | T>({
		queryKey: ['files', skip],
		queryFn: async () => {
			const data = await fetch('/api/pdf', {
				body: JSON.stringify(skip),
			}).then((res) => res.json());

			return data;
		},
	});

	return query;
};
