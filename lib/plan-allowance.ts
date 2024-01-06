import { Plan } from '@prisma/client';
import { CreateChatCompletionRequest } from 'openai-edge';

export const maxSize: Record<Plan, number> = {
	FREE: 8000000,
	PROFESSIONAL: 8000000000,
	STANDARD: 32000000,
};

export const model: Record<Plan, CreateChatCompletionRequest['model']> = {
	FREE: 'gpt-3.5-turbo-1106',
	PROFESSIONAL: 'gpt-4-1106-preview',
	STANDARD: 'gpt-4-32k',
};
