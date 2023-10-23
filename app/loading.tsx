import { Loader2Icon } from 'lucide-react';

const Loading = () => {
    return (
        <div className='flex min-h-[calc(100vh-80px)] flex-col items-center justify-center '>
            <Loader2Icon className='h-8 w-8 animate-spin' />
        </div>
    );
};
export default Loading;
