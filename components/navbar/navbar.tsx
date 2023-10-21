'use client'

import Link from "next/link"

import { useSession } from "next-auth/react"
import { MenuIcon } from 'lucide-react'

import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { noAuthRoutes } from "@/constants/navbar"

const Navbar = () => {
    const { status } = useSession()

    return (
        <nav className="sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-white/80 px-4 backdrop-blur dark:bg-[#0C0A09]/80 md:px-8 lg:px-16 xl:px-40 2xl:px-64">
            <Link href='/' className="text-3xl font-black text-black dark:text-white md:text-4xl"><span className="text-primary">PDF</span>izado</Link>

            <div className="flex items-center gap-x-6 md:gap-x-12">
                <ul className="hidden md:flex md:items-center md:gap-x-12">
                    {
                        noAuthRoutes.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className="text-center font-semibold duration-200 ease-in-out hover:text-primary">{label}</Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    status === 'authenticated'
                    && <Link href='/dashboard' className={buttonVariants({ variant: "default", className: 'hidden md:flex text-lg' })}>Ir al Dashboard</Link>
                }
                <ThemeSwitcher />
                <Sheet>
                    <SheetTrigger asChild className="flex md:hidden">
                        <Button size='icon' aria-label="Mobile navbar menu button">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-white dark:bg-[#1C1917]">
                        <ul>
                            {
                                noAuthRoutes.map(({ href, label }) => (
                                    <li key={href} className="mb-4 text-lg font-medium">
                                        <Link href={href}>{label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                        {
                            status === 'authenticated'
                            &&
                            <SheetFooter>
                                <Button className="w-full font-medium">Ir al Dashboard</Button>
                            </SheetFooter>
                        }
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
export default Navbar