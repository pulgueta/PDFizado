export const maxSizeAllowed = (plan: string) => {
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

export const plan = (plan: string) => {
	switch (plan) {
		case 'FREE':
			return 'gpt-3.5-turbo-0613';
		case 'STANDARD':
			return 'gpt-4-32k';
		case 'PROFESSIONAL':
			return 'gpt-4-32k';
		default:
			return 'gpt-3.5-turbo-0613';
	}
};
