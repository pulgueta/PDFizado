import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: 'Debes ingresar un email válido' }),
	password: z
		.string()
		.min(4, 'La contraseña debe ser de al menos 4 caracteres.'),
});

export const registerSchema = z
	.object({
		name: z.string().min(6, 'El nombre debe tener al menos 6 caracteres.'),
		email: z
			.string()
			.min(6, 'El email debe tener al menos 6 caracteres.')
			.email({ message: 'Debes ingresar un email válido' }),
		password: z
			.string()
			.min(4, 'La contraseña debe ser de al menos 6 caracteres.'),
		confirmPassword: z
			.string()
			.min(4, 'La contraseña debe ser de al menos 6 caracteres.'),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Las contraseñas deben coincidir',
		path: ['confirmPassword'],
	});

export const awsSchema = z.object({
	key: z.string().min(1, 'La llave debe tener al menos 1 caracter.'),
	name: z.string().min(1, 'El nombre debe tener al menos 1 caracter.'),
	url: z.string().url({ message: 'Debes ingresar una url válida' }),
});

export const emailSchema = z.object({
	email: z.string().email({ message: 'Debes ingresar un email válido' }),
});

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.min(6, 'El email debe tener al menos 6 caracteres')
		.email({ message: 'Debes ingresar un email válido' }),
});

export const resetSchema = z
	.object({
		email: z
			.string()
			.min(6, 'El email debe tener al menos 6 caracteres')
			.email({ message: 'Debes ingresar un email válido' }),
		password: z
			.string()
			.min(6, 'La contraseña debe ser de al menos 6 caracteres.'),
		confirmPassword: z
			.string()
			.min(6, 'La contraseña debe ser de al menos 6 caracteres.'),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Las contraseñas deben coincidir',
		path: ['confirmPassword'],
	});
