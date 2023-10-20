'use client'

import Link from "next/link"

import { MenuIcon } from 'lucide-react'

import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { noAuthRoutes } from "@/constants/navbar"

const Navbar = () => {
    return (
        <nav className="px-4 md:px-8 lg:px-16 xl:px-40 2xl:px-64 h-20 flex items-center justify-between border-b sticky top-0 z-50 bg-white/80 dark:bg-[#0C0A09]/80 backdrop-blur">
            <Link href='/' className="text-3xl md:text-4xl font-black text-black dark:text-white"><span className="text-primary">PDF</span>izado</Link>

            <div className="flex items-center gap-x-6 md:gap-x-12">
                <ul className="hidden md:flex md:items-center md:gap-x-12">
                    {
                        noAuthRoutes.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className="text-center font-semibold hover:text-primary ease-in-out duration-200">{label}</Link>
                            </li>
                        ))
                    }
                </ul>
                <Link href='/dashboard' className={buttonVariants({ variant: "default", className: 'hidden md:flex text-lg' })}>Ir al Dashboard</Link>
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
                                    <li key={href} className="text-lg mb-4 font-medium">
                                        <Link href={href}>{label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <SheetFooter>
                            <Button className="font-medium w-full">Ir al Dashboard</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
export default Navbar