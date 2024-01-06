import { Message } from 'ai/react';
import { ChatCompletionRequestMessageRoleEnum } from 'openai-edge';

import { cn } from '~/lib/utils';

export const MessageList = ({ messages }: { messages: Message[] }) => {
	if (!messages) return <></>;

	// if (loading)
	// 	return (
	// 		<div
	// 			key={`${messages[0].id}`}
	// 			className='w-max animate-fade-up rounded-lg bg-neutral-600 px-4 py-2 animate-duration-300 md:max-w-md lg:max-w-lg'
	// 		>
	// 			<Loader2 className='size-4 animate-spin' />
	// 		</div>
	// 	);

	return messages.map((message) => (
		<div
			key={message.id}
			className={cn(
				'mb-4 flex w-max animate-fade-up rounded-lg animate-duration-[400ms] animate-ease-in-out',
				{
					'ml-auto  bg-primary':
						message.role ===
						ChatCompletionRequestMessageRoleEnum.User,
					'mr-auto bg-neutral-600':
						message.role ===
						ChatCompletionRequestMessageRoleEnum.Assistant,
				}
			)}
		>
			<div className='max-w-sm rounded-lg px-4 py-2 text-white md:max-w-md lg:max-w-lg'>
				<p className='text-sm'>{message.content}</p>
			</div>
		</div>
	));
};
