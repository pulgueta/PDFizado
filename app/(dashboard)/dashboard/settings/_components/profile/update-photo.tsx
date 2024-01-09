import { UploadCloudIcon } from 'lucide-react';

import { Button } from '~/shadcn/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/shadcn/dialog';
import { Dropzone } from './dropzone';

export const dynamic = 'force-dynamic';

export const UpdatePhoto = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className='absolute bottom-0 z-40 rounded-full'
					size='icon'
				>
					<UploadCloudIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 rounded-xl md:max-w-md'>
				<DialogHeader>
					<DialogTitle>Actualizar foto de perfil</DialogTitle>
				</DialogHeader>
				<Dropzone />
			</DialogContent>
		</Dialog>
	);
};
