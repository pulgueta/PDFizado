'use client';

import { Message, useChat } from 'ai/react';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

import { ScrollArea } from '~/shadcn/scroll-area';
import { Input } from '~/shadcn/input';
import { MessageList } from './message-list';

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

	return (
		<div className='flex-1 p-2'>
			<ScrollArea className='relative h-[calc(40vh)] max-h-svh py-2 md:h-[calc(100vh-140px)]'>
				<MessageList messages={messages} />
				{isLoading && (
					<div className='relative mb-4 mr-auto flex w-max animate-fade-up rounded-lg bg-neutral-600 animate-duration-[400ms] animate-ease-in-out'>
						<div className='relative max-w-sm rounded-lg px-4 py-2 text-white md:max-w-md lg:max-w-lg'>
							<Loader2Icon className='h-4 w-4 animate-spin' />
							<div className='absolute bottom-0 left-1 h-3 w-3 rotate-45 bg-neutral-600' />
						</div>
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
