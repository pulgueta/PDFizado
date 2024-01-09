import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { File } from '@prisma/client';

export const useDeletePDF = ({ file }: { file: File }) => {
	const { refresh } = useRouter();

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationKey: ['deleteFile'],
		mutationFn: (id: string) => {
			const files = fetch('/api/pdf', {
				method: 'DELETE',
				body: JSON.stringify({ id, key: file.awsKey }),
			}).then((res) => res.json());

			return files;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['files'],
			});
			toast.success('PDF eliminado correctamente');
			refresh();
		},
		onError: () => toast.error('Error al eliminar el PDF'),
		retry: 3,
		retryDelay: 1000,
	});

	const onDeleteFile = (id: string) => () => mutation.mutate(id);

	return {
		mutation,
		onDeleteFile,
	};
};
