import { TypeOf, object, string } from 'zod';

export const loginSchema = object({
	email: string().email({
		message: 'Debes ingresar un correo electrónico válido',
	}),
	password: string().min(
		4,
		'La contraseña debe ser de al menos 4 caracteres.'
	),
});

export type Login = TypeOf<typeof loginSchema>;

export const registerSchema = object({
	name: string().min(6, 'El nombre debe tener al menos 6 caracteres.'),
	email: string()
		.min(6, 'El correo electrónico debe tener al menos 6 caracteres.')
		.email({ message: 'Debes ingresar un correo electrónico válido' }),
	password: string().min(
		4,
		'La contraseña debe ser de al menos 6 caracteres.'
	),
	confirmPassword: string().min(
		4,
		'La contraseña debe ser de al menos 6 caracteres.'
	),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
	message: 'Las contraseñas deben coincidir',
	path: ['confirmPassword'],
});

export type Register = TypeOf<typeof registerSchema>;

export const awsSchema = object({
	key: string().min(1, 'La llave debe tener al menos 1 caracter.'),
	name: string().min(1, 'El nombre debe tener al menos 1 caracter.'),
	url: string().url({ message: 'Debes ingresar una url válida' }),
});

export const resetSchema = object({
	email: string()
		.min(6, 'El correo electrónico debe tener al menos 6 caracteres')
		.email({ message: 'Debes ingresar un correo electrónico válido' })
		.optional(),
	password: string()
		.min(6, 'La contraseña debe ser de al menos 6 caracteres.')
		.optional(),
	confirmPassword: string()
		.min(6, 'La contraseña debe ser de al menos 6 caracteres.')
		.optional(),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
	message: 'Las contraseñas deben coincidir',
	path: ['confirmPassword'],
});

export const supportSchema = object({
	issue: string({ required_error: 'Debes ingresar un mensaje' }).min(
		10,
		'El mensaje debe contener al menos 10 caracteres'
	),
});

export type Support = TypeOf<typeof supportSchema>;
