import { Message } from 'ai';

import { cn } from '~/lib/utils';

export const MessageList = ({ messages }: { messages: Message[] }) => {
    if (!messages) return <></>;

    return messages.map((message) => (
        <div
            key={message.id}
            className={cn(
                'relative mb-4 flex w-max animate-fade-up rounded-lg animate-duration-[400ms] animate-ease-in-out',
                {
                    'ml-auto  bg-primary': message.role === 'user',
                    'mr-auto bg-neutral-600': message.role === 'assistant',
                }
            )}
        >
            <div className='relative max-w-sm rounded-lg px-4 py-2 text-white md:max-w-md lg:max-w-lg'>
                <p className='text-sm'>{message.content}</p>
                <div
                    className={cn(
                        'absolute bottom-0 h-3 w-3 rotate-45 bg-primary',
                        {
                            'right-1 bg-primary': message.role === 'user',
                            'left-1 bg-neutral-600':
                                message.role === 'assistant',
                        }
                    )}
                ></div>
            </div>
        </div>
    ));
};
