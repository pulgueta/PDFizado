import { usePathname, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Mutation } from './types';

export const usePDFMutation = () => {
	const { push, refresh } = useRouter();
	const pathname = usePathname();

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationKey: ['uploadToS3'],
		mutationFn: ({ key, name, url }: Mutation) => {
			const data = fetch('/api/files', {
				body: JSON.stringify({
					key,
					name,
					url,
				}),
				method: 'POST',
			}).then((res) => res.json());

			return data;
		},
		onError: (err) => {
			toast.error(err.message || 'Error al subir el PDF');
		},
		onSuccess: ({ id }) => {
			toast.success(
				'Tu PDF se ha procesado correctamente, serás redirigido en unos segundos'
			);
			queryClient.invalidateQueries({
				queryKey: ['uploadToS3'],
			});
			refresh();
			push(`${pathname}/${id}`);
		},
		retry: 3,
		retryDelay: 1000,
	});

	return mutation;
};
