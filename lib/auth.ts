import type { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
// import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { User as PrismaUser } from '@prisma/client';

import { db } from '~/database/db';
import { env } from '~/env';
import NextAuth from 'next-auth';

declare module 'next-auth' {
	// eslint-disable-next-line no-unused-vars
	interface Session extends DefaultSession {
		user: {
			id: string;
			name: string;
			email: string;
			emailVerified: boolean;
			plan: string;
			mercadopagoCustomerId: string;
			mercadopagoSubscriptionId: string;
			mercadopagoPriceId: string;
			mercadopagoCurrentPeriodEnd: string;
			paypalCustomerId: string;
			paypalSubscriptionId: string;
			paypalPriceId: string;
			paypalCurrentPeriodEnd: string;
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
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Tu email',
					value: '',
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: 'Tu contraseña',
					value: '',
				},
			},
			authorize: async (credentials: any) => {
				const user = (await db.user.findUnique({
					where: {
						email: credentials?.email,
					},
					select: {
						id: true,
						name: true,
						email: true,
						password: true,
						emailVerified: true,
						plan: true,
						mercadopagoCustomerId: true,
						mercadopagoSubscriptionId: true,
						mercadopagoPriceId: true,
						mercadopagoCurrentPeriodEnd: true,
						paypalCustomerId: true,
						paypalSubscriptionId: true,
						paypalPriceId: true,
						paypalCurrentPeriodEnd: true,
					},
				})) as PrismaUser;

				if (!user) throw new Error('User not found');

				if (!user.emailVerified) throw new Error('Email not verified');

				const valid = await compare(
					credentials?.password as string,
					user.password
				);

				if (!valid) throw new Error('Invalid password');

				return user as PrismaUser;
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30,
		updateAge: 60 * 60 * 24,
	},
	callbacks: {
		async jwt({ token, user, account }) {
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
		async session({ session, token }) {
			session.user = token.user as any;

			return session;
		},
	},
	secret: env.NEXTAUTH_SECRET,
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
