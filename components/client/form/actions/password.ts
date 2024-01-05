'use server';

import { db } from '~/database/db';
import { ResetPasswordEmail } from '~/emails/forgot-password';
import { resend } from '~/lib/auth/resend.config';
import { forgotPasswordSchema } from '~/schemas';

export const forgotPassword = async (_prevState: any, e: FormData) => {
	const data = forgotPasswordSchema.safeParse(
		Object.fromEntries(e.entries())
	);

	if (!data.success)
		return { error: data.error.flatten().fieldErrors.email![0] };

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
