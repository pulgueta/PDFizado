import type { ElementRef } from 'react';
import { useEffect, useRef } from 'react';

import type { Message } from 'ai/react';
import { useChat } from 'ai/react';
import { useQuery } from '@tanstack/react-query';

export const useMessages = (fileId: string) => {
	const query = useQuery<Message[]>({
		queryKey: ['messages', fileId],
		queryFn: async () => {
			return await fetch('/api/chat/messages', {
				method: 'POST',
				body: JSON.stringify(fileId),
			}).then((res) => res.json());
		},
	});

	const msg = useRef<ElementRef<'div'>>(null);

	const vercel = useChat({
		api: '/api/chat',
		body: {
			fileId,
		},
		initialMessages: query.data || [],
	});

	useEffect(() => {
		msg.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}, [vercel]);

	return { query, vercel, msg };
};
