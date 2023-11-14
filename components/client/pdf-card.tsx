import Link from 'next/link';
import { revalidatePath } from 'next/cache';

import { File } from '@prisma/client';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

import { Button, buttonVariants } from '~/shadcn/button';
import { useParams } from 'next/navigation';

export const PDFCard: React.FC<File> = (file) => {
    const params = useParams();

    const session = useSession();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ['deleteFile'],
        mutationFn: async ({ id, key }: { id: string; key: string }) => {
            const res = await fetch('/api/files', {
                method: 'DELETE',
                body: JSON.stringify({ id, key }),
            });

            const files = await res.json();

            return files;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['deleteFile'],
            });
            toast.success('PDF eliminado correctamente');
            revalidatePath(`/dashboard/${params.id}`, 'page');
        },
    });

    const onDeleteFile = (id: string) => () => {
        mutate({ id, key: file.awsKey });
    };

    return (
        <div className='mx-auto flex w-96 flex-col rounded-2xl border p-4'>
            <h3 className='truncate text-xl font-semibold'>{file.name}</h3>
            <p className='mt-4 text-muted-foreground'>
                Fecha de creación:{' '}
                {new Date(file.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}
            </p>

            <div className='mt-6 flex w-full items-center justify-between border-t pt-4'>
                <Link
                    href={`/dashboard/${session.data?.user.id}/${file.id}`}
                    className={buttonVariants({
                        variant: 'ghost',
                    })}
                >
                    Ver PDF
                </Link>
                <Button variant='destructive' onClick={onDeleteFile(file.id)}>
                    {isPending ? (
                        <Loader2Icon className='h-4 w-4 animate-spin' />
                    ) : (
                        'Eliminar PDF'
                    )}
                </Button>
            </div>
        </div>
    );
};
