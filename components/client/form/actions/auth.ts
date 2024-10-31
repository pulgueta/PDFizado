'use server';

import { revalidatePath } from 'next/cache';

import { hash } from '@node-rs/argon2';
import { AuthError } from 'next-auth';

import { db } from '~/database/db';
import VerifyEmailTemplate from '~/emails/verify-email';
import { signIn } from '~/lib/auth/auth';
import {
	type Login,
	type Register,
	loginSchema,
	registerSchema,
} from '~/schemas';
import { Provider } from '~/types';
import { resend } from '~/lib/auth/resend.config';

export const loginWithProvider = async (provider: Provider) => {
	try {
		await signIn(provider, {
			redirectTo: '/dashboard',
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'AdapterError':
				case 'OAuthAccountNotLinked':
				case 'OAuthSignInError':
					return {
						error: 'Algo salió mal iniciando sesión con tu cuenta.',
					};
			}
		}

		throw error;
	}
};

export const login = async (data: Login) => {
	const values = loginSchema.safeParse(data);

	if (!values.success) return { error: 'Campos inválidos' };

	const { email, password } = values.data;

	const user = await db.user.findUnique({ where: { email } });

	if (!user) {
		return { error: 'El usuario no existe' };
	}

	if (!user.emailVerified) {
		return { error: 'Debes verificar tu correo antes de iniciar sesión' };
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: '/dashboard',
		});
		revalidatePath('/login');
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Credenciales incorrectas' };
				default:
					return { error: 'Algo salió mal, intenta nuevamente' };
			}
		}

		throw error;
	}
};

export const register = async (data: Register) => {
	const values = registerSchema.safeParse(data);

	if (!values.success) {
		return { error: 'Campos inválidos' };
	}

	const { name, email, password } = values.data;

	const userExists = await db.user.findUnique({
		where: { email },
	});

	if (userExists) return { error: 'El correo ya está siendo utilizado' };

	const hashedPassword = await hash(password);

	const user = await db.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
			image: 'https://source.boringavatars.com/marble',
		},
		select: {
			id: true,
			password: false,
		},
	});

	const { data: emailId, error } = await resend.emails.send({
		from: 'PDFizado <no-reply@pdfizado.com>',
		to: [email],
		subject: 'PDFizado - Verificación de correo electrónico',
		react: VerifyEmailTemplate({
			link:
				process.env.NODE_ENV === 'development'
					? `http://localhost:3000/verify?id=${user.id}`
					: `https://www.pdfizado.com/verify?id=${user.id}`,
		}),
	});

	if (error) {
		return { error };
	}

	return {
		message: 'User created successfully!',
		user,
		emailId,
	};
};
