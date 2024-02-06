import { NextResponse } from 'next/server';

import { Plan, Role } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from './auth.config';
import { db } from '~/database/db';

export type ExtendedUser = DefaultSession['user'] & {
	role: Role;
	plan: Plan;
	lemonSqueezyHref: string;
	paddleHref: string;
	emailVerified: boolean;
	picture: string;
	accounts: [];
	isOAuth: boolean;
};

declare module 'next-auth' {
	// eslint-disable-next-line no-unused-vars
	interface Session {
		user: ExtendedUser;
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signOut,
	signIn,
	update,
} = NextAuth({
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
	},
	events: {
		linkAccount: async ({ user }) => {
			await db.user.update({
				where: {
					id: user.id,
				},
				data: {
					emailVerified: true,
				},
			});
		},
	},
	callbacks: {
		jwt: async ({ token }) => {
			if (!token.sub) return token;

			const existingUser = await db.user.findUnique({
				where: {
					id: token.sub,
				},
			});

			if (!existingUser) return token;

			const existingAccount = await db.account.findFirst({
				where: {
					userId: existingUser.id,
				},
			});

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.image = existingUser.image;
			token.role = existingUser.role;
			token.plan = existingUser.plan;

			return token;
		},
		session: async ({ session, token }) => {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role as Role;
			}

			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.isOAuth = token.isOAuth as boolean;
				session.user.plan = token.plan as Plan;
				session.user.image = token.image as string;
			}

			return session;
		},
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLogged = !!auth?.user;
			const isDashboard = nextUrl.pathname.startsWith('/dashboard');

			if (isDashboard) {
				if (isLogged) return true;

				return false;
			} else if (isLogged) {
				return NextResponse.redirect(new URL('/dashboard', nextUrl));
			}

			return true;
		},
	},
	pages: {
		signIn: '/login',
		newUser: '/register',
	},
	debug: process.env.NODE_ENV === 'development',
	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},
	useSecureCookies: process.env.NODE_ENV === 'production',
	cookies: {
		sessionToken: {
			name: 'next-auth.session-token',
			options: {
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
		callbackUrl: {
			name: 'next-auth.callback-url',
			options: {
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
		csrfToken: {
			name: 'next-auth.csrf-token',
			options: {
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
	...authConfig,
});
