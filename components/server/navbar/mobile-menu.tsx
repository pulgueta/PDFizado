import { MenuIcon } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '~/shadcn/sheet';
import { Button } from '~/shadcn/button';
import { MobileRoutes } from './routes';

export const MobileMenu = () => (
	<Sheet>
		<SheetTrigger asChild className='flex md:hidden' id='navbar-btn'>
			<Button size='icon' aria-label='Mobile navbar menu button'>
				<MenuIcon />
			</Button>
		</SheetTrigger>
		<SheetContent className='bg-white dark:bg-[#1C1917]'>
			<MobileRoutes />
		</SheetContent>
	</Sheet>
);
