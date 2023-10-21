'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"

const registerSchema = z.object({
    name: z.string().min(6, 'El nombre debe tener al menos 6 caracteres.'),
    email: z.string().email({ message: 'Debes ingresar un email válido' }),
    password: z.string().min(4, 'La contraseña debe ser de al menos 6 caracteres.'),
    confirmPassword: z.string().min(4, 'La contraseña debe ser de al menos 6 caracteres.')
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword']
})

export const RegisterForm = () => {
    const { push } = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        }
    })

    const onSubmit = async ({ confirmPassword, ...rest }: z.infer<typeof registerSchema>) => {
        try {
            const fetch_res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(rest)
            })

            if (!fetch_res.ok) {
                return
            }

            toast.success('Cuenta creada, ahora debes iniciar sesión', {
                duration: 1500,
                dismissible: true,
                important: true,
            })
            push('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <CardHeader>
                <CardTitle>Registro</CardTitle>
                <CardDescription>Crea una cuenta para poder usar PDFizado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                placeholder="Tu nombre"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                placeholder="Tu correo registrado"
                                                type="email"
                                                {...field}
                                            />
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
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                placeholder="Tu contraseña"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar contraseña</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                placeholder="Reescribe tu contraseña"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {
                                form.formState.isSubmitting
                                    ? <Loader2Icon className="mr-2 animate-spin" />
                                    : 'Registrarme'
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center">
                <span className="text-muted-foreground">Ya tienes cuenta? <Link href='/login' className={buttonVariants({ variant: "link" })}>Inicia sesión</Link></span>
            </CardFooter>
        </>
    )
}
