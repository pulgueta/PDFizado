import { z } from 'zod';
import { forgotPasswordSchema, loginSchema, registerSchema } from '~/schemas';

export type NavbarRoutes = {
	href: string;
	label: string;
	active?: boolean;
}[];

export type Env = {
	[key: string]: string;
};

export type Register = z.infer<typeof registerSchema>;

export type Login = z.infer<typeof loginSchema>;

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
