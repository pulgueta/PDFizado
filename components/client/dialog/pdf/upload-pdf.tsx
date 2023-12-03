import { Button } from '~/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/shadcn/dialog';
import { Dropzone } from './dropzone';
import { auth } from '~/lib/auth';
import { env } from '~/env';

export const dynamic = 'force-dynamic';

export const UploadPDF = async () => {
	const session = await auth();

	const files = (await fetch(`${env.BASE_URL}/api/files`, {
		next: {
			revalidate: 5,
		},
	}).then((res) => res.json())) as Number[];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					disabled={
						session?.user.plan === 'FREE' && files.length >= 6
					}
				>
					Subir PDF
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-xs rounded-xl md:max-w-lg lg:max-w-xl'>
				<DialogHeader>
					<DialogTitle>Subir PDF</DialogTitle>
				</DialogHeader>
				<Dropzone />
			</DialogContent>
		</Dialog>
	);
};
