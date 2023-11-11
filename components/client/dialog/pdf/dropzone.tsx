import { useMutation } from '@tanstack/react-query';
import { CheckCircle2Icon, Loader2Icon, UploadCloudIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { uploadToS3 } from '~/lib/aws/awsS3';

enum Plans {
    FREE = 8388608,
    STANDARD = 16777216,
    PROFESSIONAL = 33554432,
}

const Dropzone = () => {
    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ['uploadToS3'],
        mutationFn: async ({ key, name }: { key: string; name: string }) => {
            const response = await fetch('/api/aws', {
                body: JSON.stringify({
                    key,
                    name,
                }),
                method: 'POST',
            });

            return response.json();
        },
        retry: 3,
        retryDelay: 1000,
    });

    const session = useSession();

    const plan = session.data?.user.plan as any;

    console.log(Plans[plan]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        multiple: false,
        maxSize: (plan && Plans[plan]) ?? Plans.FREE,
        validator: (file) => {
            if (file.size > (plan && Plans[plan]) ?? Plans.FREE) {
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

                    mutate(res, {
                        onError: (err) => {
                            toast.error(err.message || 'Error al subir el PDF');
                        },
                        onSuccess: (data) => {
                            console.log(data);
                            toast.success(
                                'Tu PDF se ha procesado correctamente, serás redirigido en unos segundos'
                            );
                        },
                    });
                },
                {
                    loading: `Subiendo ${file[0].name}...`,
                    success: `${file[0].name} subido correctamente`,
                    error: `Error al subir ${file[0].name}`,
                }
            );
        },
    });

    return (
        <div
            {...getRootProps({
                className:
                    'border border-dashed border-gray-300 rounded px-4 py-8 my-4 md:py-16 bg-neutral-100 dark:bg-neutral-900 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 ease-in-out',
            })}
        >
            <input {...getInputProps()} disabled={isPending || isSuccess} />
            <>
                {isSuccess ? (
                    <>
                        <CheckCircle2Icon className='mx-auto h-8 w-8 text-green-400' />
                        <p className='mt-2 text-center font-medium'>
                            Se ha procesado tu PDF, redirigiendo...
                        </p>
                    </>
                ) : !isPending ? (
                    <>
                        <UploadCloudIcon className='mx-auto h-8 w-8' />
                        <p className='mt-2 text-center font-medium'>
                            Arrastra aquí tu PDF
                        </p>
                    </>
                ) : (
                    <>
                        <Loader2Icon className='mx-auto h-8 w-8 animate-spin' />
                        <p className='mt-2 text-center font-medium'>
                            Procesando PDF...
                        </p>
                    </>
                )}
            </>
        </div>
    );
};
export default Dropzone;
