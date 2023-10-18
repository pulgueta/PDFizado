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
]

export const authRoutes: NavbarRoutes[] = [
    {
        href: '/pricing',
        label: 'Precio'
    },
    {
        href: '/login',
        label: 'Iniciar sesión'
    },
    {
        href: '/dasboard',
        label: 'Dashboard'
    },
]