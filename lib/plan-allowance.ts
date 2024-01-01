import { $Enums } from '@prisma/client';

export const maxSizeAllowed = (plan: $Enums.Plan) => {
	switch (plan) {
		case 'FREE':
			return 8000000;
		case 'STANDARD':
			return 32000000;
		case 'PROFESSIONAL':
			return 8000000000;
		default:
			return 16000000;
	}
};

export const plan = (plan: $Enums.Plan) => {
	switch (plan) {
		case 'FREE':
			return 'gpt-3.5-turbo-1106';
		case 'STANDARD':
			return 'gpt-4-32k';
		case 'PROFESSIONAL':
			return 'gpt-4-1106-preview';
		default:
			return 'gpt-3.5-turbo-1106';
	}
};
