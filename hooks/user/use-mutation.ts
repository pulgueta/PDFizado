import { usePathname, useRouter } from 'next/navigation';

import {
	useMutation as useTanStackMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { Mutation } from './types';

type Endpoint = 'pdf' | 'images';

type HookOptions = {
	endpoint: Endpoint;
};

export const useMutation = ({ endpoint }: HookOptions) => {
	const { push, refresh } = useRouter();
	const pathname = usePathname();

	const queryClient = useQueryClient();
	const mutation = useTanStackMutation({
		mutationKey: ['uploadToS3'],
		mutationFn: ({ key, name, url }: Mutation) => {
			const data = fetch(`/api/${endpoint}`, {
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
			toast.error(err.message || 'Error al subir el archivo');
		},
		onSuccess: ({ id }) => {
			if (endpoint === 'pdf') {
				toast.success(
					'Tu PDF se ha procesado correctamente, serás redirigido en unos segundos'
				);
			}
			queryClient.invalidateQueries({
				queryKey: ['uploadToS3'],
			});
			refresh();
			return endpoint === 'pdf' && push(`${pathname}/${id}`);
		},
		retry: 3,
		retryDelay: 1000,
	});

	return mutation;
};
