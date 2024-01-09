'use client';

import { Message, useChat } from 'ai/react';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

import { ScrollArea } from '~/shadcn/scroll-area';
import { Input } from '~/shadcn/input';
import { MessageList } from './message-list';
import { cn } from '~/lib/utils';
import { ElementRef, useEffect, useRef } from 'react';

export const Chat = ({ fileId }: { fileId: string }) => {
	const { data, isLoading } = useQuery<Message[]>({
		queryKey: ['messages', fileId],
		queryFn: async () => {
			return await fetch('/api/chat/messages', {
				method: 'POST',
				body: JSON.stringify(fileId),
			}).then((res) => res.json());
		},
	});

	const msg = useRef<ElementRef<'div'>>(null);

	const {
		input,
		handleInputChange,
		handleSubmit,
		messages,
		isLoading: vercelLoading,
	} = useChat({
		api: '/api/chat',
		body: {
			fileId,
		},
		initialMessages: data || [],
	});

	useEffect(() => {
		msg.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}, [messages]);

	return (
		<div className='flex-1 p-2'>
			<ScrollArea className='relative h-[calc(40vh)] max-h-svh py-2 md:h-[calc(100vh-140px)]'>
				<MessageList messages={messages} loading={vercelLoading} />
				{isLoading && (
					<div
						className={cn(
							'relative mb-4 mr-auto flex w-max animate-fade-up rounded-lg bg-neutral-600 px-4 py-2 animate-duration-[400ms] animate-ease-in-out',
							{
								'rounded-tl-none': isLoading,
							}
						)}
					>
						<Loader2Icon className='h-4 w-4 animate-spin' />
					</div>
				)}
				{vercelLoading && (
					<div
						ref={msg}
						className='relative mb-4 mr-auto flex w-max animate-fade-up rounded-lg rounded-tl-none bg-neutral-600 px-4 py-2 animate-duration-[400ms] animate-ease-in-out'
					>
						<Loader2Icon className='h-4 w-4 animate-spin' />
					</div>
				)}
			</ScrollArea>
			<footer className='flex w-full items-center gap-4'>
				<form
					onSubmit={handleSubmit}
					className='sticky inset-x-0 bottom-0 flex w-full items-center gap-4'
				>
					<Input
						className='bottom-0 h-full w-full'
						value={input}
						autoFocus
						onChange={handleInputChange}
						disabled={vercelLoading}
						placeholder='Haz cualquier pregunta sobre el documento...'
					/>
				</form>
			</footer>
		</div>
	);
};
