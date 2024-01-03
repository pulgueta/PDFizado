'use server';

import { revalidatePath } from 'next/cache';

import { hash } from 'argon2';
import { AuthError } from 'next-auth';
import { Resend } from 'resend';

import { db } from '~/database/db';
import VerifyEmailTemplate from '~/emails/verify-email';
import { env } from '~/env/server.mjs';
import { signIn } from '~/lib/auth/auth';
import { loginSchema, registerSchema } from '~/schemas';
import { Login, Provider, Register } from '~/types';

const resend = new Resend(env.RESEND_API_KEY);

export const loginWithProvider = async (provider: Provider) =>
	await signIn(provider, {
		redirectTo: '/dashboard',
	});

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
