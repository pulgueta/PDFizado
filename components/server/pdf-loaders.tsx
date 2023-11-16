import { Skeleton } from '~/shadcn/skeleton';

export const PDFLoader = () => {
    return Array.from({ length: 3 }, (_, i) => (
        <div key={i} className='mx-auto w-80 rounded-2xl border p-4 md:w-96'>
            <Skeleton className='mb-4 h-10' />

            <Skeleton className='mb-2 h-6' />

            <hr className='mb-4 mt-6' />
            <div className='flex items-center justify-between'>
                <Skeleton className='h-10 w-1/3' />
                <Skeleton className='h-10 w-1/3' />
            </div>
        </div>
    ));
};
