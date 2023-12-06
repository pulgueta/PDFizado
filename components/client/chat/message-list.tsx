import { cn } from '~/lib/utils';
import { Message } from './types';

export const MessageList = ({ messages }: { messages: Message[] }) => {
	if (!messages) return <></>;

	return messages.map((message) => (
		<div
			key={message.id}
			className={cn(
				'mb-4 flex w-max animate-fade-up rounded-lg animate-duration-[400ms] animate-ease-in-out',
				{
					'ml-auto  bg-primary': message.isUserMessage,
					'mr-auto bg-neutral-600': !message.isUserMessage,
				}
			)}
		>
			<div className='max-w-sm rounded-lg px-4 py-2 text-white md:max-w-md lg:max-w-lg'>
				<p className='text-sm'>{message.text}</p>
			</div>
		</div>
	));
};
