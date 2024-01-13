import Image from 'next/image';

import { UserIcon } from 'lucide-react';

import { Label } from '~/shadcn/label';
import { Card, CardContent } from '~/shadcn/card';
import { Input } from '~/shadcn/input';
import { Button } from '~/shadcn/button';
import { Separator } from '~/shadcn/separator';
import { CardHeader } from '~/components/server/settings/card-header';
import { currentUser } from '~/lib/auth/currentUser';
import { UpdatePhoto } from './_components/profile/update-photo';
import { DeleteAccount } from './_components/profile/delete-account';
import { base64Img } from '~/lib/base64-image';

const Profile = async () => {
	const user = await currentUser();

	if (!user) return;

	const blurDataURL = user.image ? await base64Img(user.image) : '';

	return (
		<Card className='container mb-4 max-w-lg px-0'>
			<CardHeader
				title='Perfil'
				description='Aquí podrás encontrar tu información personal y actualizar la que requieras.'
			/>

			<CardContent className='flex flex-col gap-y-4'>
				<Label htmlFor='email'>Correo electrónico</Label>
				<Input disabled value={user.email!} />
				{!user.isOAuth && (
					<>
						<Label htmlFor='password'>Contraseña</Label>
						<Button className='w-max'>Cambiar contrasñea</Button>
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
							<UpdatePhoto />
						</div>
					</>
				)}
				<Separator />
				<Label htmlFor='delete-account'>Zona de peligro</Label>
				<DeleteAccount {...user} />
			</CardContent>
		</Card>
	);
};

export default Profile;
