import { useSession } from 'next-auth/react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Plan } from '@prisma/client';

import { uploadToS3 } from '~/lib/aws/awsS3';
import { maxSize } from '~/lib/plan-allowance';
import { Mutation } from './types';

export const useDropzonePDF = ({
	mutate,
}: {
	// eslint-disable-next-line no-unused-vars
	mutate: (res: Mutation) => void;
}) => {
	const session = useSession();

	const plan = session.data?.user.plan as Plan;

	const dropzone = useDropzone({
		accept: { 'application/pdf': ['.pdf'] },
		maxFiles: 1,
		multiple: false,
		maxSize: maxSize[plan],
		validator: (file) => {
			if (file.size > maxSize[plan]) {
				return {
					code: 'file-too-large',
					message: 'El archivo excede el límite de tu plan',
				};
			}

			if (!file.type.includes('pdf')) {
				return {
					code: 'file-invalid-type',
					message: 'El archivo no es un PDF',
				};
			}

			return null;
		},
		onDropRejected: (fileRejections) => {
			toast.error(fileRejections[0].errors[1].message);
		},
		onError: (err) => {
			toast.error(err.message);
		},
		onDropAccepted: (file) => {
			toast.promise(
				async () => {
					const res = await uploadToS3(file[0]);

					if (!res.key || !res.name) {
						toast.error('Error al subir el PDF');
					}

					mutate(res);
				},
				{
					loading: `Subiendo ${file[0].name}...`,
					success: `${file[0].name} subido correctamente`,
					error: `Error al subir ${file[0].name}`,
				}
			);
		},
	});

	return dropzone;
};
