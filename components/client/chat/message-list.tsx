import { ElementRef, useEffect, useRef } from 'react';

import { Message } from 'ai/react';
import { ChatCompletionRequestMessageRoleEnum } from 'openai-edge';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '~/lib/utils';

export const MessageList = ({ messages }: { messages: Message[] }) => {
	const msg = useRef<ElementRef<'div'>>(null);

	useEffect(() => {
		msg.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}, [messages]);

	if (!messages) return <></>;

	return messages.map((message) => (
		<div
			key={message.id}
			id={message.role}
			ref={msg}
			className={cn(
				'mb-4 flex w-max max-w-lg animate-fade-up rounded-lg px-4 py-2 text-white animate-duration-300 animate-ease-in-out md:max-w-sm lg:max-w-prose',
				{
					'ml-auto rounded-br-none bg-primary':
						message.role ===
						ChatCompletionRequestMessageRoleEnum.User,
					'mr-auto rounded-bl-none bg-neutral-600':
						message.role ===
						ChatCompletionRequestMessageRoleEnum.Assistant,
				}
			)}
		>
			<p className='text-sm'>
				{typeof message.content === 'string' ? (
					<Markdown remarkPlugins={[remarkGfm]}>
						{message.content}
					</Markdown>
				) : (
					message.content
				)}
			</p>
		</div>
	));
};
