import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { UploadCloudIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import axios from 'axios';

import { Button } from '~/shadcn/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/shadcn/dialog';
import { uploadToS3 } from '~/lib/awsS3';

const UploadPDF = () => {
    const { push } = useRouter();
    const { mutate } = useMutation({
        mutationKey: ['uploadToS3'],
        mutationFn: async ({ key, name }: { key: string; name: string }) => {
            const { data } = await axios.post('/api/aws', { key, name });

            return data;
        },
        retry: 1,
        retryDelay: 1000,
    });
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        multiple: false,
        maxSize: 8 * 1024 * 1024,
        validator: (file) => {
            if (file.size > 8 * 1024 * 1024) {
                return {
                    code: 'file-too-large',
                    message: 'El archivo es demasiado grande',
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
            console.log(err);
            toast.error(err.message);
        },
        onDropAccepted: (file) => {
            toast.promise(
                async () => {
                    const res = await uploadToS3(file[0]);

                    if (!res.key || !res.name) {
                        throw new Error('Error al subir el archivo');
                    }

                    mutate(res, {
                        onError: (err) => {
                            console.log(err);
                        },
                        onSuccess: (data) => {
                            console.log(data);
                            // toast.success(data.message);
                        },
                    });
                },
                {
                    loading: `Subiendo ${file[0].name}...`,
                    success: 'Archivo subido correctamente',
                    error: 'Error al subir el archivo',
                }
            );
        },
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Subir PDF</Button>
            </DialogTrigger>
            <DialogContent className='max-w-xs rounded-xl md:max-w-md lg:max-w-lg'>
                <DialogHeader>
                    <DialogTitle>Subir PDF</DialogTitle>
                </DialogHeader>
                <div
                    {...getRootProps({
                        className:
                            'border border-dashed border-gray-300 rounded px-4 py-8 my-4 md:py-16 bg-neutral-100 dark:bg-neutral-900 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 ease-in-out',
                    })}
                >
                    <input {...getInputProps()} />
                    <>
                        <UploadCloudIcon className='mx-auto h-10 w-10' />
                        <p className='mt-4 text-center font-medium'>
                            Arrastra aquí tu PDF
                        </p>
                    </>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UploadPDF;
