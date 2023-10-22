import NextAuth from 'next-auth/next'
import { DefaultSession, type NextAuthOptions, type User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Google from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { db } from "@/database/db";
import { env } from '@/env';
declare module 'next-auth' {
    interface Session {
        user: {
            id: string
        } & DefaultSession['user']
    }
}

export const authOptions = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: env.GOOGLE_PUBLIC_ID,
            clientSecret: env.GOOGLE_SECRET_ID,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const user = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        password: true,
                    }
                })

                if (!user) throw new Error('User not found')

                const valid = await compare(credentials?.password as string, user.password)

                if (!valid) throw new Error('Invalid password')

                return {
                    ...user,
                    id: user.id.toString()
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 48 * 3,
        updateAge: 24 * 60 * 60 * 2,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }

            return token
        }
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
            }
        },
        callbackUrl: {
            name: 'next-auth.callback-url',
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true,
            }
        },
        csrfToken: {
            name: 'next-auth.csrf-token',
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true,
            }
        },
    },
}) satisfies NextAuthOptions;