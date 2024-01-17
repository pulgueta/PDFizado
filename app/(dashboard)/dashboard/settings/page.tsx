import { Card, CardContent } from '~/shadcn/card';
import { Label } from '~/shadcn/label';
import { Input } from '~/shadcn/input';
import { Separator } from '~/shadcn/separator';
import { Button } from '~/shadcn/button';
import { CardHeader } from '~/components/server/settings/card-header';
import { currentUser } from '~/lib/auth/currentUser';
import { ParentDialog } from '~/components/client/dialog/dialog-component';
import { DeleteButton } from './_components/profile/delete-button';
import { NoOAuthSettings } from './_components/profile/no-oauth-settings';

const Profile = async () => {
	const user = await currentUser();

	if (!user) return;

	return (
		<Card className='container mb-4 max-w-lg px-0'>
			<CardHeader
				title='Perfil'
				description='Aquí podrás encontrar tu información personal y actualizar la que requieras.'
			/>

			<CardContent className='flex flex-col gap-y-4'>
				<Label htmlFor='email'>Correo electrónico</Label>
				<Input disabled value={user.email!} />
				{!user.isOAuth && <NoOAuthSettings />}
				<Separator />
				<Label htmlFor='delete-account'>Zona de peligro</Label>
				<ParentDialog
					trigger={
						<Button
							variant='destructive'
							className='w-full md:w-max'
						>
							Eliminar mi cuenta
						</Button>
					}
					title='Eliminar mi cuenta'
					description='Este proceso no podrá revertirse luego'
				>
					<DeleteButton user={user} />
				</ParentDialog>
			</CardContent>
		</Card>
	);
};

export default Profile;
