'use client';

import { useParams } from 'next/navigation';
import { useChat } from 'ai/react';

import { useQuery } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { MessageList } from './message-list';
import { useEffect } from 'react';
import { ScrollArea } from '~/components/ui/scroll-area';

export const Chat = () => {
    const { fileId } = useParams();

    const { data } = useQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: ['messages'],
        queryFn: async () => {
            const data = await fetch(`/api/chat/${fileId}`, {
                method: 'POST',
                body: JSON.stringify({
                    fileId,
                }),
            });
            const res = await data.json();

            return res;
        },
    });

    const { input, handleInputChange, handleSubmit, messages, isLoading } =
        useChat({
            api: '/api/chat',
            body: {
                fileId,
            },
            initialMessages: data?.messages || [],
        });

    useEffect(() => {
        const messagesScroll = document.getElementById(
            'scroller'
        ) as HTMLDivElement;

        if (!messagesScroll) return;

        messagesScroll.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    });

    return (
        <div className='flex-1 p-4'>
            <ScrollArea className='relative h-[calc(45vh)] max-h-screen py-4 md:h-[calc(100vh-180px)]'>
                <MessageList messages={messages} />
                {isLoading && (
                    <div
                        className='flex w-full items-center justify-center'
                        id='scroller'
                    >
                        <div className='h-16 w-16 animate-spin rounded-full border-y-2 border-primary'></div>
                    </div>
                )}
            </ScrollArea>
            <footer className='flex w-full items-center gap-4'>
                <form
                    onSubmit={handleSubmit}
                    className='sticky inset-x-0 bottom-0 flex w-full items-center gap-4'
                >
                    <Textarea
                        autoFocus
                        className='bottom-0 w-full'
                        value={input}
                        placeholder='Haz cualquier pregunta sobre el documento...'
                        onChange={handleInputChange}
                    />
                    <Button size='icon'>
                        <SendIcon />
                    </Button>
                </form>
            </footer>
        </div>
    );
};
