import type { ElementRef } from 'react';
import { useEffect, useRef } from 'react';

import type { Message } from 'ai/react';

import { cn } from '~/lib/utils';

type Messages = {
	messages: Message[];
	loading: boolean;
};

export const MessageList = ({ messages, loading }: Messages) => {
	const msg = useRef<ElementRef<'div'>>(null);

	useEffect(() => {
		if (!loading)
			msg.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			});
	}, [messages, loading]);

	return messages.map((message) => (
		<div
			key={message.id}
			id={message.role}
			ref={msg}
			className={cn(
				'mb-4 flex max-w-xs animate-fade-up rounded-lg px-4 py-2 text-white animate-duration-300 animate-ease-in-out md:max-w-xs lg:max-w-lg',
				{
					'ml-auto w-max rounded-br-none bg-primary':
						message.role === 'user',
					'mr-auto w-max rounded-bl-none bg-neutral-600':
						message.role === 'assistant',
				}
			)}
		>
			<p className='text-sm'>{message.content}</p>
		</div>
	));
};
