'use server';

import { hash } from 'argon2';

import { db } from '~/database/db';
import { ResetPasswordEmail } from '~/emails/forgot-password';
import { currentUser } from '~/lib/auth/currentUser';
import { resend } from '~/lib/auth/resend.config';
import { resetSchema } from '~/schemas';

export const forgotPassword = async (_prevState: any, e: FormData) => {
	const data = resetSchema.safeParse(Object.fromEntries(e.entries()));

	if (!data.success) return { error: data.error.flatten().fieldErrors.email };

	const { email } = data.data;

	const isUserCreated = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (!isUserCreated)
		return { error: 'No se encontró un usuario con ese correo eletrónico' };

	if (!isUserCreated.emailVerified)
		return {
			error: 'Debes verificar tu correo electrónico primero para cambiar tu contraseña',
		};

	const { token } = await generateToken(isUserCreated.id);

	const { error } = await resend.emails.send({
		from: 'PDFizado <no-reply@pdfizado.com>',
		to: [isUserCreated.email ?? ''],
		subject: 'PDFizado - Recuperación de contraseña',
		react: ResetPasswordEmail({
			resetLink:
				process.env.NODE_ENV === 'development'
					? `http://localhost:3000/reset-password?token=${token}`
					: `https://www.pdfizado.com/reset-password?token=${token}`,
			username: isUserCreated.name ?? 'usuario',
		}),
		tags: [{ name: 'category', value: 'reset_password' }],
	});

	if (error) return { error };

	return { status: 'success' };
};

const generateToken = async (id: string) =>
	await db.verificationToken.create({
		data: {
			expires: new Date(Date.now() + 15 * 60 * 1000),
			identifier: `token_requested_by_${id}`,
		},
	});

export const updatePassword = async (_prev: any, data: FormData) => {
	const user = await currentUser();

	if (!user?.email) {
		return {
			success: false,
			message: 'Debes iniciar sesión',
		};
	}

	const body = resetSchema.safeParse(Object.fromEntries(data.entries()));

	if (!body.success) {
		return {
			success: false,
			message: body.error.flatten().fieldErrors.confirmPassword,
		};
	}

	const { confirmPassword, password } = body.data;

	if (password !== confirmPassword) {
		return { success: false, error: 'Las contraseñas no coinciden' };
	}

	const newPassword = await hash(password ?? '');

	const dbUser = await db.user.update({
		data: {
			password: newPassword,
		},
		where: {
			email: user.email,
		},
		select: {
			id: true,
			password: false,
		},
	});

	await db.verificationToken.deleteMany({
		where: {
			identifier: `token_requested_by_${dbUser.id}`,
		},
	});

	return {
		success: true,
		message: 'La contraseña ha sido actualizada',
	};
};
