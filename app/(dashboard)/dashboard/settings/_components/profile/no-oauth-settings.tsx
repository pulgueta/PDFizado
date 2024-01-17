import Image from 'next/image';

import { UploadCloudIcon, UserIcon } from 'lucide-react';

import { Label } from '~/shadcn/label';
import { Input } from '~/shadcn/input';
import { Separator } from '~/shadcn/separator';
import { Button } from '~/shadcn/button';
import { currentUser } from '~/lib/auth/currentUser';
import { base64Img } from '~/lib/base64-image';
import { ParentDialog } from '~/components/client/dialog/dialog-component';
import { ResetPassword } from '~/components/client/form/reset-password';
import { Dropzone } from './dropzone';

export const NoOAuthSettings = async () => {
	const user = await currentUser();

	if (!user) return;

	const blurDataURL = user.image ? await base64Img(user.image) : '';

	return (
		<>
			<Label htmlFor='password'>Contraseña</Label>
			<Input disabled placeholder='************' />
			<ParentDialog
				title='Cambiar contraseña'
				description='Aquí podrás actualizar tu contraseña y acceder con ella
					luego.'
				trigger={<Button className='w-max'>Cambiar contraseña</Button>}
			>
				<ResetPassword />
			</ParentDialog>
			<Separator />
			<Label htmlFor='profile'>Foto de perfil</Label>
			<div className='relative'>
				{user.image ? (
					<Image
						src={user.image}
						alt={`Foto de perfil de ${user.name}`}
						width={40}
						height={40}
						quality={100}
						placeholder='blur'
						blurDataURL={blurDataURL}
						className='size-32 cursor-pointer rounded-full object-cover shadow'
					/>
				) : (
					<UserIcon className='size-32 rounded-full bg-secondary p-4' />
				)}
				<ParentDialog
					trigger={
						<Button
							className='absolute bottom-0 z-40 rounded-full'
							size='icon'
						>
							<UploadCloudIcon />
						</Button>
					}
					title='Actualizar foto de perfil'
					description='Aquí podrás actualizar tu foto de perfil'
				>
					<Dropzone />
				</ParentDialog>
			</div>
		</>
	);
};
