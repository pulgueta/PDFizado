import { NextResponse } from 'next/server';

import { Plan, Role } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from './auth.config';
import { db } from '~/database/db';

export type ExtendedUser = DefaultSession['user'] & {
	role: Role;
	mercadopagoSubscriptionId: string;
	plan: Plan;
	emailVerified: boolean;
	accounts: [];
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
		jwt: async ({ token, user, account }) => {
			if (account) {
				token.accessToken = account.accessToken;
			}

			switch (account?.type) {
				case 'credentials':
					token.user = user;
					break;
			}

			return token;
		},
		session: async ({ session, token }) => {
			session.user = token.user as any;

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
