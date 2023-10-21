'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePrice } from "@/hooks"
import { HelpCircleIcon } from "lucide-react"

export const PriceCards = () => {
    const standard = usePrice(25000)
    const professional = usePrice(50000)

    return (
        <TooltipProvider>
            <Card className='mx-auto w-[350px] bg-neutral-50 dark:bg-[#131110] md:w-[25rem]'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-3xl font-bold'>Gratis</CardTitle>
                    <CardDescription>Para documentos simples</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-center text-5xl font-black'>Sin costo</p>
                    <Separator className='my-4' />
                    <ul className="text-muted-foreground">
                        <li>&#9989; 12 páginas por PDF</li>
                        <li>&#9989; 8MB de tamaño límite</li>
                        <li>&#9989; Respuesta estándar</li>
                        <li>&#9989; Soporte estándar</li>
                        <li>&#9989; Subir hasta 6 PDFs</li>
                        <li>&#10060; Respuestas más claras</li>
                        <li>&#10060; Soporte prioritario</li>
                        <li>&#10060; Alojamiento de archivos de por vida
                            <Tooltip delayDuration={300}>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4 ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Se eliminarán los archivos en 30 días</p>
                                </TooltipContent>
                            </Tooltip>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className='w-full'>Adquirir</Button>
                </CardFooter>
            </Card>

            <Card className='relative mx-auto w-[350px] border-2 border-primary bg-neutral-50 dark:bg-[#131110] md:w-[25rem]'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-3xl font-bold'>Estándar</CardTitle>
                    <CardDescription>Para documentos más grandes</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-center text-5xl font-black'>{standard}</p>
                    <Separator className='my-4' />
                    <ul className="text-muted-foreground">
                        <li>&#9989; 32 páginas por PDF</li>
                        <li>&#9989; 16MB de tamaño límite</li>
                        <li>&#9989; Respuesta más rápida</li>
                        <li>&#9989; Soporte estáandar</li>
                        <li>&#9989; Subir hasta 18 PDFs</li>
                        <li>&#9989; Respuestas más claras</li>
                        <li>&#9989; Soporte prioritario</li>
                        <li>&#10060; Alojamiento de archivos de por vida
                            <Tooltip delayDuration={300}>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4 ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Se eliminarán los archivos en 60 días</p>
                                </TooltipContent>
                            </Tooltip>
                        </li>                    </ul>
                </CardContent>
                <Badge
                    className="absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1/2"
                    aria-label="Más popular"
                >Más popular</Badge>
                <CardFooter>
                    <Button className='w-full'>Adquirir</Button>
                </CardFooter>
            </Card>

            <Card className='mx-auto w-[350px] bg-neutral-50 dark:bg-[#131110] md:w-[25rem]'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-3xl font-bold'>Profesional</CardTitle>
                    <CardDescription>Para cualquier documento extenso</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-center text-5xl font-black'>{professional}</p>
                    <Separator className='my-4' />
                    <ul className="text-muted-foreground">
                        <li>&#9989; 64 páginas por PDF</li>
                        <li>&#9989; 32MB de tamaño límite</li>
                        <li>&#9989; Respuesta más rápida</li>
                        <li>&#9989; Soporte estáandar</li>
                        <li>&#9989; PDFs ilimitados</li>
                        <li>&#9989; Respuestas más claras</li>
                        <li>&#9989; Soporte personalizado</li>
                        <li>&#9989; Alojamiento de archivos de por vida</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className='w-full'>Adquirir</Button>
                </CardFooter>
            </Card>
        </TooltipProvider>
    )
}