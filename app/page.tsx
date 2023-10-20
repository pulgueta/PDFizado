'use client'

import { NextPage } from "next"
import Image from "next/image"

import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"
import { useCountry, usePrice } from "@/hooks"
import Link from "next/link"

const Home: NextPage = () => {

  const price = usePrice()
  const country = useCountry()

  return (
    <main className="min-h-screen p-4 bg-white dark:bg-[#1C1917]">
      <div className="max-w-4xl bg-white border z-40 shadow dark:bg-[#131110] mx-auto text-center relative mt-8 px-4 py-8 md:py-12 rounded-3xl">
        <h1 className="text-6xl md:text-7xl lg:text-8xl text-black dark:text-white font-black mb-4 md:mb-8"><span className="text-primary">PDF</span>izado</h1>
        <p className="text-base md:text-xl mb-8">Haz tu estudio más fácil interactuando con la Inteligencia Artificial mediante un chat para extraer la información más relevante de tus archivos <span className="font-bold">PDF.</span></p>
        <p className="text-lg md:text-2xl">&iexcl;Solamente arrastra tu archivo y puedes empezar a preguntar lo que necesites!</p>
        <div className="w-48 h-48 bg-primary/20 animate-pulse absolute rounded-full right-0 blur-xl z-10" />
        <div className="w-48 h-48 bg-primary/20 animate-pulse absolute rounded-full -left-16 top-0 blur-xl" />
      </div>

      <section className="relative p-4 mt-16 w-full">
        <h1 className="text-4xl font-bold text-center">Interfaz y utilidad</h1>
        <p className="text-base md:text-lg text-center my-8">Contamos con una interfaz sencilla de utilizar y fácil de entender para una accesibilidad con alcance total para todo tipo de usuarios.</p>
        <div className="flex flex-col md:flex-row items-center justify-center mt-8">
          <div className="w-full md:w-3/4 relative">
            <Image
              src="/landing.webp"
              alt="PDFizado - UI"
              width={900}
              height={500}
              priority
              quality={100}
              className="rounded-xl mx-auto shadow-xl relative z-40"
            />
            <Badge
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
              aria-label="Demostración"
            >Demostración</Badge>
          </div>
        </div>
      </section>

      <div className="w-full md:w-10/12 mx-auto my-16">
        <h1 className="text-center text-3xl md:text-5xl font-black mb-8 md:mb-8">Tenemos 2 planes para que puedas utilizar <span className="text-primary">PDF</span>izado</h1>
        <p className="text-center text-muted-foreground mb-4">*Precio en {country === 'CO' ? 'COP' : 'USD'}</p>
        <div className="flex flex-col lg:flex-row w-full md:w-10/12 mx-auto gap-8 md:gap-2">
          <Card className='mx-auto w-[360px] md:w-[25rem] bg-neutral-50 dark:bg-[#131110]'>
            <CardHeader className='text-center'>
              <CardTitle className='text-3xl font-bold'>Gratis</CardTitle>
              <CardDescription>Para iniciar</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className='font-black text-center text-5xl mb-4'>Sin costo</h1>
              <Separator className='mb-4' />
              <ul className="text-muted-foreground">
                <li>&#9989; 12 páginas por PDF</li>
                <li>&#9989; 16MB de tamaño límite</li>
                <li>&#9989; 1 usuario</li>
                <li>&#9989; 1 usuario</li>
                <li>&#9989; 1 usuario</li>
                <li>&#10060; Respuesta más rápida</li>
                <li>&#10060; Respuesta más rápida</li>
                <li>&#10060; Respuesta más rápida</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className='w-full'>Adquirir</Button>
            </CardFooter>
          </Card>

          <Card className='mx-auto w-[360px] md:w-[25rem] bg-neutral-50 dark:bg-[#131110] border-2 border-primary relative'>
            <CardHeader className='text-center'>
              <CardTitle className='text-3xl font-bold'>Profesional</CardTitle>
              <CardDescription>Para documentos más grandes</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className='font-black text-center text-5xl mb-4'>{price}</h1>
              <Separator className='mb-4' />
              <ul className="text-muted-foreground">
                <li>&#9989; 64 páginas por PDF</li>
                <li>&#9989; 64MB de tamaño límite</li>
                <li>&#9989; 1 usuario</li>
                <li>&#9989; 1 usuario</li>
                <li>&#9989; 1 usuario</li>
                <li>&#9989; Respuesta más rápida</li>
                <li>&#10060; Respuesta más rápida</li>
                <li>&#10060; Respuesta más rápida</li>
              </ul>
            </CardContent>
            <Badge
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
              aria-label="Más popular"
            >Más popular</Badge>
            <CardFooter>
              <Button className='w-full'>Adquirir</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <section className="py-4 md:py-16 flex flex-col items-center justify-center gap-8 bg-[#131110] w-full rounded-xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-center">&iquest;Qué esperas para agilizar tu forma de estudiar?</h1>
        <Link href='/register' className={buttonVariants({ variant: "default", size: "lg", className: 'text-xl' })}>
          Empezar<ArrowRightIcon className="w-6 h-6 ml-2" />
        </Link>
      </section>
      <div className="w-48 h-48 bg-primary/20 animate-pulse absolute rounded-full left-16 bottom-0 blur-xl" />
      <div className="w-48 h-48 bg-primary/20 animate-pulse absolute rounded-full right-8 -bottom-32 blur-xl" />
    </main>
  )
}
export default Home