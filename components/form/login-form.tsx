'use client'

import Link from "next/link"

import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { Loader2Icon } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"

const loginSchema = z.object({
    email: z.string().email({ message: 'Debes ingresar un email válido' }),
    password: z.string().min(4, 'La contraseña debe ser de al menos 4 caracteres.')
})

export const LoginForm = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const fetch_res = await fetch('/api/login', {
                body: JSON.stringify(data),
                method: 'POST',
            })

            const na_res = await signIn('credentials', {
                callbackUrl: '/',
                redirect: true,
                email: data.email,
                password: data.password
            })

            if (!fetch_res.ok || !na_res?.ok) {
                return
            }

            toast.success('Bienvenido de vuelta.', {
                duration: 1500,
                dismissible: true,
                important: true,
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <CardHeader>
                <CardTitle>Iniciar sesión</CardTitle>
                <CardDescription>Accede a tu cuenta para iniciar a interactuar.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu correo registrado" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu contraseña" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {
                                form.formState.isSubmitting
                                    ? <Loader2Icon className="mr-2 animate-spin" />
                                    : 'Iniciar sesión'
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center">
                <Separator />
                <Button
                    className="w-full my-4"
                    variant='secondary'
                    size='lg'
                    onClick={() => signIn('google')}
                >
                    <svg
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        className="mr-2"
                    >
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Inicia sesión con Google
                </Button>
                <span className="text-muted-foreground">Aún no tienes cuenta? <Link href='/register' className={buttonVariants({ variant: "link" })}>Regístrate</Link></span>
            </CardFooter>
        </>
    )
}