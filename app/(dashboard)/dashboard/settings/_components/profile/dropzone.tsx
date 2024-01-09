'use client';

import { CheckCircle2Icon, Loader2Icon, UploadCloudIcon } from 'lucide-react';

import { useDropzone } from '~/hooks/user/use-dropzone';
import { useMutation } from '~/hooks/user/use-mutation';

export const Dropzone = () => {
	const { mutate, isPending, isSuccess } = useMutation({
		endpoint: 'images',
	});

	const { getRootProps, getInputProps } = useDropzone({
		mutate,
		file: 'image',
		path: 'pictures',
	});

	return (
		<div
			{...getRootProps({
				className:
					'mx-auto my-4 w-full cursor-pointer rounded border border-dashed border-gray-300 bg-neutral-100 px-8 py-14 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800',
			})}
		>
			<input {...getInputProps()} disabled={isPending || isSuccess} />
			<>
				{isSuccess ? (
					<>
						<CheckCircle2Icon className='mx-auto h-8 w-8 text-green-400' />
						<p className='mt-2 text-center font-medium'>
							¡Tu foto de perfil se ha actualizado correctamente!
						</p>
					</>
				) : !isPending ? (
					<>
						<UploadCloudIcon className='mx-auto h-8 w-8' />
						<p className='my-2 text-center font-medium'>
							Arrastra aquí tu nueva foto, o haz clic aquí para
							seleccionarla
						</p>
					</>
				) : (
					<>
						<Loader2Icon className='mx-auto h-8 w-8 animate-spin' />
						<p className='my-2 text-center font-medium'>
							Actualizando tu foto...
						</p>
					</>
				)}
			</>
		</div>
	);
};
