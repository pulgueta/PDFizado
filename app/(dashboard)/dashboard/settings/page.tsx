import Image from 'next/image';

import { Label } from '~/shadcn/label';
import { Card, CardContent } from '~/shadcn/card';
import { Input } from '~/shadcn/input';
import { Button } from '~/shadcn/button';
import { Separator } from '~/shadcn/separator';
import { CardHeader } from '~/components/server/settings/card-header';
import { currentUser } from '~/lib/auth/currentUser';
import { UpdatePhoto } from './_components/profile/update-photo';
import { base64Img } from '~/lib/base64-image';

const Profile = async () => {
	const user = await currentUser();

	if (!user) return;

	const blurDataURL = await base64Img(user.image!);

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
							<Image
								src={
									user.image
										? user.image
										: 'https://via.placeholder.com/150'
								}
								alt='Profile picture'
								width={128}
								height={128}
								placeholder='blur'
								blurDataURL={blurDataURL}
								className='aspect-square rounded-full'
							/>
							<UpdatePhoto />
						</div>
					</>
				)}
				<Separator />
				<Label htmlFor='profile'>Eliminar cuenta</Label>
				<Button className='w-max' variant='destructive'>
					Eliminar mi cuenta
				</Button>
			</CardContent>
		</Card>
	);
};

export default Profile;
