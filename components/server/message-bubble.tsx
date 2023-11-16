export const AIMessage = ({ text }: { text: string }) => {
    return (
        <div className='relative mb-4 flex justify-start'>
            <div className='relative max-w-xs rounded-lg bg-muted-foreground px-4 py-2 text-white dark:bg-neutral-600'>
                <p className='text-sm'>{text}</p>
                <div className='absolute bottom-0 left-1 h-3 w-3 rotate-45 bg-muted-foreground dark:bg-neutral-600'></div>
            </div>
        </div>
    );
};

export const UserMessage = ({ text }: { text: string }) => {
    return (
        <div className='relative mb-4 flex justify-end'>
            <div className='relative max-w-xs rounded-lg bg-primary px-4 py-2 text-white'>
                <p className='text-sm'>{text}</p>
                <div className='absolute bottom-0 right-1 h-3 w-3 rotate-45 bg-primary'></div>
            </div>
        </div>
    );
};
