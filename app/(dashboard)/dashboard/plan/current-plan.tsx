import { Plan } from '@prisma/client';

export const CurrentPlan = ({ plan }: { plan: string }) => {
	let _plan = '';

	switch (Plan[plan as keyof typeof Plan]) {
		case 'FREE':
			_plan = 'Gratis';
			break;
		case 'PROFESSIONAL':
			_plan = 'Profesional';
			break;
	}

	return <span className='font-semibold'>{_plan}</span>;
};
