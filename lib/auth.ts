import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
// import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { verify } from 'argon2';
import { User as PrismaUser } from '@prisma/client';

import { db } from '~/database/db';
import { env } from '~/env';

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

// const oAuthUser = async (email: string, OAuthName: string) => {
//     const user = await db.user.findUnique({
//         where: {
//             email,
//         },
//     });

//     const { email: oAuthEmail, id: oAuthId } = user as PrismaUser;

//     if (user) {
//         return user;
//     }

//     const oAuthedUser = await db.user.create({
//         data: {
//             id: oAuthId,
//             email: oAuthEmail,
//             name: OAuthName,
//             password: '@OAuthPassword',
//         },
//     });

//     return oAuthedUser;
// };

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		// TODO: Properly set up Google Auth with email.
		// Google({
		//     clientId: env.GOOGLE_PUBLIC_ID,
		//     clientSecret: env.GOOGLE_SECRET_ID,
		// }),
		Credentials({
			name: 'Credentials',
			credentials: {},
			authorize: async (
				credentials: Partial<Record<'email' | 'password', unknown>>
			) => {
				const res = await fetch(`${env.AUTH_URL}/api/login`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) {
					return null;
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
				// case 'oauth':
				//     token.user = await oAuthUser(
				//         account.email as string,
				//         account.name as string
				//     );
				//     break;
			}

			return token;
		},
		session: async ({ session, token }) => {
			session.user = token.user as any;

			return session;
		},
		redirect: async ({ baseUrl, url }) => {
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			return baseUrl;
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
		nonce: {
			name: 'next-auth.nonce',
			options: {
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
		state: {
			name: 'next-auth.state',
			options: {
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
});
