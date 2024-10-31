import type { Plan } from '@prisma/client';

export const maxSize: Record<Plan, number> = {
	FREE: 8000000,
	PROFESSIONAL: 8000000000,
	STANDARD: 32000000,
};

export const model: Record<Plan, string> = {
	FREE: 'gpt-4o',
	PROFESSIONAL: 'o1-preview',
	STANDARD: 'o1-mini',
};

export const maxFiles: Record<Plan, number> = {
	FREE: 6,
	PROFESSIONAL: 12,
	STANDARD: Number.MAX_SAFE_INTEGER,
};

export const plan: Record<Plan, Plan> = {
	FREE: 'FREE',
	PROFESSIONAL: 'PROFESSIONAL',
	STANDARD: 'STANDARD',
};
