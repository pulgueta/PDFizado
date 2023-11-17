'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';
import { useChat } from 'ai/react';

import { useQuery } from '@tanstack/react-query';
import { Loader2Icon, SendIcon } from 'lucide-react';
import axios from 'axios';

import { Button } from '~/shadcn/button';
import { Textarea } from '~/shadcn/textarea';
import { ScrollArea } from '~/shadcn/scroll-area';
import { MessageList } from './message-list';
import { Message } from 'ai';

export const Chat = () => {
    const { fileId } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['messages', fileId],
        queryFn: async () => {
            const { data } = await axios.post<Message[]>(
                `/api/chat/${fileId}`,
                {
                    fileId,
                }
            );

            return data;
        },
    });

    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: '/api/chat',
        body: {
            fileId,
        },
        initialMessages: data || [],
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
    }, [messages]);

    return (
        <div className='flex-1 p-4'>
            <ScrollArea className='relative h-[calc(45vh)] max-h-screen py-4 md:h-[calc(100vh-180px)]'>
                <MessageList messages={messages} />
                {isLoading && (
                    <div className='relative mb-4 mr-auto flex w-max animate-fade-up rounded-lg bg-neutral-600 animate-duration-[400ms] animate-ease-in-out'>
                        <div className='relative max-w-sm rounded-lg px-4 py-2 text-white md:max-w-md lg:max-w-lg'>
                            <Loader2Icon className='h-4 w-4 animate-spin' />
                            <div className='absolute bottom-0 left-1 h-3 w-3 rotate-45 bg-neutral-600'></div>
                        </div>
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
