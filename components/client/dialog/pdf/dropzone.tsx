'use client';

import {
	CheckCircle2Icon,
	FileIcon,
	Loader2Icon,
	UploadCloudIcon,
} from 'lucide-react';

import { useDropzone } from '~/hooks/user/use-dropzone';
import { useMutation } from '~/hooks/user/use-mutation';

export const Dropzone = () => {
	const { mutate, isPending, isSuccess } = useMutation({
		endpoint: 'pdf',
	});

	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		mutate,
		file: 'pdf',
		path: 'uploads',
	});

	return (
		<div
			{...getRootProps({
				className:
					'mx-auto my-4 w-full cursor-pointer rounded border border-dashed border-gray-300 bg-neutral-100 px-4 py-16 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 md:py-24',
			})}
		>
			<input {...getInputProps()} disabled={isPending || isSuccess} />
			<>
				{isSuccess ? (
					<>
						<CheckCircle2Icon className='mx-auto size-8 text-green-400' />
						<p className='mt-2 text-center font-medium'>
							Se ha procesado tu PDF, redirigiendo...
						</p>
					</>
				) : !isPending ? (
					<>
						<UploadCloudIcon className='mx-auto size-8' />
						<p className='my-2 text-center font-medium'>
							Arrastra aquí tu PDF
						</p>
					</>
				) : (
					<>
						<Loader2Icon className='mx-auto size-8 animate-spin' />
						<p className='my-2 text-center font-medium'>
							Procesando PDF...
						</p>
						{acceptedFiles && acceptedFiles[0] && (
							<div className='mx-auto flex max-w-sm items-center gap-4 overflow-hidden rounded border p-4'>
								<FileIcon className='size-6 text-primary' />

								<span className='truncate text-center text-sm text-muted-foreground'>
									{acceptedFiles[0].name}
								</span>
								<span className='text-center text-sm text-muted-foreground'>
									{Number(
										acceptedFiles[0].size / 1000000
									).toFixed(2)}
									MB{' '}
								</span>
							</div>
						)}
					</>
				)}
			</>
		</div>
	);
};
