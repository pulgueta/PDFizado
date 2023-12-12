import { Button } from '~/shadcn/button';
import { logout } from './action';

export const SignOut = () => (
	<Button
		formAction={logout}
		aria-label='Cerrar sesión'
		id='logout-btn'
		variant='destructive'
	>
		Cerrar sesión
	</Button>
);

export const SignOutMobile = () => (
	<Button
		formAction={logout}
		className='w-full font-medium'
		aria-label='Cerrar sesión'
		id='logout-btn'
		variant='destructive'
	>
		Cerrar sesión
	</Button>
);
