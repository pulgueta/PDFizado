import {
	CardDescription,
	CardTitle,
	CardHeader as ShadHeader,
} from '~/shadcn/card';

export const CardHeader = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<ShadHeader>
			<CardTitle>{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</ShadHeader>
	);
};
