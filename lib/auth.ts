import NextAuth from 'next-auth/next';
import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
// import { User as PrismaUser } from '@prisma/client';

import { db } from '@/database/db';
import { env } from '@/env';

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

export const authOptions = NextAuth({
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
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const user = await db.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        password: true,
                    },
                });

                if (!user) throw new Error('User not found');

                const valid = await compare(
                    credentials?.password as string,
                    user.password
                );

                if (!valid) throw new Error('Invalid password');

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
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
        async session({ session, token, user }) {
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
    useSecureCookies: true,
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
        callbackUrl: {
            name: 'next-auth.callback-url',
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
        csrfToken: {
            name: 'next-auth.csrf-token',
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
    },
}) satisfies NextAuthOptions;
