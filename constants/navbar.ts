import { NavbarRoutes } from '~/types';

export const noAuthRoutes: NavbarRoutes = [
	{
		href: '/pricing',
		label: 'Precios',
	},
	{
		href: '/login',
		label: 'Iniciar sesión',
	},
	{
		href: '/register',
		label: 'Crear cuenta',
	},
];

export const authRoutes: NavbarRoutes = [
	{
		href: '/dashboard/pricing',
		label: 'Precios',
	},
	{
		href: '/dashboard',
		label: 'Dashboard',
	},
	{
		href: '/dashboard/plan',
		label: 'Tu plan',
	},
	{
		href: '/dashboard/settings',
		label: 'Ajustes',
	},
];

export const footerRoutes: NavbarRoutes = [
	{
		href: '/pricing',
		label: 'Precios',
	},
	{
		href: '/dashboard/:id',
		label: 'Dashboard',
	},
	{
		href: '/terms-of-service',
		label: 'Términos y condiciones',
	},
];
