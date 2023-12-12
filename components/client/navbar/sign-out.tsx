import { Button } from '~/shadcn/button';
import { logout } from './action';

export const SignOut = () => (
	<form action={logout}>
		<Button
			aria-label='Cerrar sesión'
			id='logout-btn'
			variant='destructive'
		>
			Cerrar sesión
		</Button>
	</form>
);

export const SignOutMobile = () => (
	<form action={logout}>
		<Button
			className='w-full font-medium'
			aria-label='Cerrar sesión'
			id='logout-btn'
			variant='destructive'
		>
			Cerrar sesión
		</Button>
	</form>
);
