import { useSession } from 'next-auth/react';
import { useDropzone as useDropzoneDep } from 'react-dropzone';
import { toast } from 'sonner';
import { Plan } from '@prisma/client';

import { uploadToS3 } from '~/lib/aws/awsS3';
import { maxSize } from '~/lib/plan-allowance';
import { Mutation } from './types';

type Path = 'uploads' | 'pictures';
type FileType = 'pdf' | 'image';

type DropzoneHook = {
	// eslint-disable-next-line no-unused-vars
	mutate: (res: Mutation) => void;
	file: FileType;
	path: Path;
};

const PHOTO_UPLOAD_MAX_SIZE = 2000000;

export const useDropzone = ({ mutate, file, path }: DropzoneHook) => {
	const session = useSession();

	const plan = session.data?.user.plan as Plan;

	const dropzone = useDropzoneDep({
		accept:
			file === 'image'
				? { 'image/*': [] }
				: { 'application/pdf': ['.pdf'] },
		maxFiles: 1,
		multiple: false,
		maxSize: file === 'pdf' ? maxSize[plan] : PHOTO_UPLOAD_MAX_SIZE,
		validator: (upload) => {
			switch (file) {
				case 'image':
					if (!upload.type.includes('image/')) {
						return {
							code: 'file-invalid-type',
							message: 'El archivo no es una imagen',
						};
					}

					if (upload.size > PHOTO_UPLOAD_MAX_SIZE) {
						return {
							code: 'file-too-large',
							message: 'La imagen debe ser inferior a 2MB',
						};
					}
					break;
				case 'pdf':
					if (upload.size > maxSize[plan]) {
						return {
							code: 'file-too-large',
							message:
								'El PDF excede el límite de tamaño de tu plan',
						};
					}

					if (!upload.type.includes('pdf')) {
						return {
							code: 'file-invalid-type',
							message: 'El archivo no es un PDF',
						};
					}
					break;
			}

			return null;
		},
		onDropRejected: (fileRejections) => {
			toast.error(fileRejections[0].errors[1].message);
		},
		onError: (err) => {
			toast.error(err.message);
		},
		onDropAccepted: (upload) => {
			toast.promise(
				async () => {
					const res = await uploadToS3(upload[0], path);

					if (!res.key || !res.name) {
						switch (file) {
							case 'image':
								toast.error('Error al subir la imagen');
								break;
							case 'pdf':
								toast.error('Error al subir el PDF');
								break;
							default:
								toast.error('Error al subir el archivo');
								break;
						}
					}

					mutate(res);
				},
				{
					loading: `Subiendo ${
						file === 'pdf' ? 'tu documento' : 'tu foto'
					}...`,
					success: `${
						file === 'pdf'
							? 'PDF subido correctamente'
							: 'Foto de perfil actualizada correctamente'
					}`,
					error: `Error al subir ${
						file === 'pdf' ? 'PDF' : 'tu foto'
					}`,
				}
			);
		},
	});

	return dropzone;
};
