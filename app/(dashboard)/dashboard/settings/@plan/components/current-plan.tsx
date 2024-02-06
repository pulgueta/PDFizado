import { Plan } from '@prisma/client';

export const CurrentPlan = ({ plan }: { plan: Plan }) => {
	const text: Record<Plan, string> = {
		FREE: 'Gratis',
		PROFESSIONAL: 'Profesional',
		STANDARD: 'Estándar',
	};

	return <span className='font-semibold'>{text[plan]}</span>;
};
