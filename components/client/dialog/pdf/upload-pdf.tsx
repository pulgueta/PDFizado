import { Button } from '~/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/shadcn/dialog';
import { Dropzone } from './dropzone';
import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';

export const dynamic = 'force-dynamic';

export const UploadPDF = async () => {
	const user = await currentUser();

	const files = await db.file.findMany({
		where: {
			userId: user?.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button disabled={user?.plan === 'FREE' && files.length >= 6}>
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
