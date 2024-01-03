'use client';

import { FormEvent, useTransition } from 'react';

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
import { Login, loginSchema } from '~/schemas';
import { login, loginWithProvider } from './actions/auth';
import { Google } from '~/components/svg/google';
import { Facebook } from '~/components/svg/facebook';
import { Badge } from '~/components/ui/badge';
import { Provider } from '~/types';

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

	const providerLogin = (
		e: FormEvent<HTMLFormElement>,
		provider: Provider
	) => {
		e.preventDefault();

		startTransition(async () => {
			const res = await loginWithProvider(provider);

			if (res?.error) {
				toast.error(res.error);
			}
		});
	};

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
							render={({
								field,
								formState: { isSubmitting },
							}) => (
								<FormItem>
									<FormLabel>Correo electrónico</FormLabel>
									<FormControl>
										<Input
											disabled={isPending && isSubmitting}
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
							render={({
								field,
								formState: { isSubmitting },
							}) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input
											disabled={isPending && isSubmitting}
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
							{form.formState.isSubmitting ? (
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
					<form
						className='w-full'
						onSubmit={(e) => providerLogin(e, 'google')}
					>
						<Button
							variant='outline'
							disabled={isPending}
							className='w-full'
						>
							<Google />
						</Button>
					</form>
					<Button
						variant='outline'
						disabled
						className='relative w-full'
					>
						<Badge className='absolute -right-6 top-0 -rotate-12'>
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
