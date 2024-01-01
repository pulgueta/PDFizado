'use client';

import { useTransition } from 'react';

import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/shadcn/form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';
import { Input } from '~/shadcn/input';
import { Separator } from '~/shadcn/separator';
import { Button, buttonVariants } from '~/shadcn/button';
import { loginSchema } from '~/schemas';
import type { Login } from '~/types';
import { login } from './actions/auth';
import { Google } from '~/components/svg/google';
import { Facebook } from '~/components/svg/facebook';
import { signIn } from 'next-auth/react';
import { Badge } from '~/components/ui/badge';

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = form.handleSubmit((data: Login) => {
		startTransition(async () => {
			const res = await login(data);

			if (res?.error) {
				toast.error(res.error);
			}
		});
	});

	return (
		<Card className='w-full md:w-[512px]'>
			<CardHeader>
				<CardTitle>Iniciar sesión</CardTitle>
				<CardDescription>
					Accede a tu cuenta para iniciar a interactuar.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={onSubmit} className='space-y-6'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo electrónico</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											autoComplete='Correo'
											placeholder='Tu correo registrado'
											type='email'
											id='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											autoComplete='Contraseña'
											placeholder='Tu contraseña'
											type='password'
											id='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='w-full'
							disabled={isPending}
							id='submit-btn'
						>
							{isPending ? (
								<Loader2Icon className='animate-spin' />
							) : (
								'Iniciar sesión'
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className='flex flex-col items-center justify-center'>
				<section className='flex w-full flex-col items-center gap-2 md:flex-row'>
					<Button
						onClick={() =>
							signIn('google', { callbackUrl: '/dashboard' })
						}
						variant='outline'
						className='w-full'
					>
						<Google />
					</Button>
					<Button
						onClick={() => signIn('facebook')}
						variant='outline'
						disabled
						className='relative w-full'
					>
						<Badge className='absolute -right-4 top-0 -rotate-12'>
							¡Pronto!
						</Badge>
						<Facebook />
					</Button>
				</section>

				<Separator className='my-4' />

				<Link
					href='/forgot-password'
					className={buttonVariants({ variant: 'link', size: 'sm' })}
				>
					Olvidé mi contraseña
				</Link>

				<span className='text-muted-foreground'>
					Si aún no tienes cuenta,{' '}
					<Link
						href='/register'
						className={buttonVariants({ variant: 'link' })}
					>
						Regístrate
					</Link>
				</span>
			</CardFooter>
		</Card>
	);
};
