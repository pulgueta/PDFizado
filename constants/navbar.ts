import { NavbarRoutes } from "@/types";

export const noAuthRoutes: NavbarRoutes[] = [
    {
        href: '/pricing',
        label: 'Precios'
    },
    {
        href: '/login',
        label: 'Iniciar sesión'
    },
    {
        href: '/register',
        label: 'Crear cuenta'
    },
]

export const authRoutes: NavbarRoutes[] = [
    {
        href: '/pricing',
        label: 'Precios'
    },
    {
        href: '/dashboard',
        label: 'Dashboard'
    },
]

export const footerRoutes: NavbarRoutes[] = [
    {
        href: '/pricing',
        label: 'Precios'
    },
    {
        href: '/dashboard',
        label: 'Dashboard'
    },
    {
        href: '/terms-of-service',
        label: 'Términos y condiciones'
    },
]