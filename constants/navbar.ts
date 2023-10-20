import { NavbarRoutes } from "@/types";

export const noAuthRoutes: NavbarRoutes[] = [
    {
        href: '/pricing',
        label: 'Precio'
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
        label: 'Precio'
    },
    {
        href: '/dasboard',
        label: 'Dashboard'
    },
]