'use client';

import { Loader2Icon, SendIcon } from 'lucide-react';

import { ScrollArea } from '~/shadcn/scroll-area';
import { Input } from '~/shadcn/input';
import { Button } from '~/shadcn/button';
import { cn } from '~/lib/utils';
import { MessageList } from './message-list';
import { useMessages } from './hooks/use-messages';

export const Chat = ({ fileId }: { fileId: string }) => {
	const { query, vercel, msg } = useMessages(fileId);

	return (
		<section className='p-2'>
			<ScrollArea className='relative h-[calc(80dvh)] max-h-dvh py-2 md:h-[calc(100dvh-140px)]'>
				<MessageList
					messages={vercel.messages}
					loading={vercel.isLoading}
				/>
				{query.isLoading && (
					<div
						className={cn(
							'relative mb-4 mr-auto flex w-max animate-fade-up rounded-lg bg-neutral-600 px-4 py-2 animate-duration-[400ms] animate-ease-in-out',
							{
								'rounded-tl-none': query.isLoading,
							}
						)}
					>
						<Loader2Icon className='size-4 animate-spin' />
					</div>
				)}
				{vercel.isLoading && (
					<div
						ref={msg}
						className='relative mb-4 mr-auto flex w-max animate-fade-up rounded-lg rounded-tl-none bg-neutral-600 px-4 py-2 animate-duration-[400ms] animate-ease-in-out'
					>
						<Loader2Icon className='size-4 animate-spin' />
					</div>
				)}
			</ScrollArea>
			<footer>
				<form
					onSubmit={vercel.handleSubmit}
					className='sticky inset-x-0 bottom-0 flex w-full items-center'
				>
					<Input
						className='bottom-0 h-full w-full'
						value={vercel.input}
						autoFocus
						onChange={vercel.handleInputChange}
						disabled={vercel.isLoading}
						placeholder='Haz cualquier pregunta sobre el documento...'
					/>
					<Button
						size='icon'
						className='absolute right-2 h-6 w-6 rounded-sm md:h-7 md:w-7'
					>
						<SendIcon className='size-3 md:size-4' />
					</Button>
				</form>
			</footer>
		</section>
	);
};
