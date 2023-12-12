import { NextResponse } from 'next/server';

import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';

import { db } from '~/database/db';
import { env } from '~/env/server.mjs';

declare module 'next-auth' {
	// eslint-disable-next-line no-unused-vars
	interface Session extends DefaultSession {
		user: {
			id: string;
			name: string;
			email: string;
			emailVerified: boolean;
			plan: string;
			mercadopagoSubscriptionId: string;
		} & DefaultSession['user'];
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {},
			authorize: async (credentials) => {
				const res = await fetch(`${env.AUTH_URL}/api/login`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) {
					switch (res.statusText) {
						case 'No user was found':
							throw new Error(res.statusText);
						case 'Email not verified':
							throw new Error(res.statusText);
						case 'Invalid credentials':
							throw new Error(res.statusText);
					}
				}

				const user = await res.json();

				return user;
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
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
	secret: env.AUTH_SECRET,
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
});
