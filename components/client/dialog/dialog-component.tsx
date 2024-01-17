import { FC, ReactNode } from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/shadcn/dialog';

export const dynamic = 'force-dynamic';

type Components = {
	trigger: ReactNode;
	children: ReactNode;
	title: string;
	description?: string | undefined;
};

export const ParentDialog: FC<Components> = ({
	children,
	trigger,
	title,
	description,
}) => (
	<Dialog>
		<DialogTrigger asChild>{trigger}</DialogTrigger>
		<DialogContent className='w-11/12 rounded-xl md:max-w-lg lg:max-w-xl'>
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
				{description && (
					<DialogDescription>{description}</DialogDescription>
				)}
			</DialogHeader>
			{children}
		</DialogContent>
	</Dialog>
);
