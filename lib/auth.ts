import { type NextAuthOptions, type User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Google from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";

import { db } from "@/database/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: process.env.GOOGLE_PUBLIC_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET_ID ?? '',
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const user = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user) return null

                const valid = await compare(credentials?.password as string, user.password)

                if (!valid) return null

                return user as User
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 48 * 3,
        updateAge: 24 * 60 * 60 * 2,
    },
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user = token
            }

            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }

            return token
        }
    },
    secret: process.env.NEXTAUTH_SECRET ?? '',
    pages: {
        signIn: '/login',
        newUser: '/register',
        signOut: '/logout',
    },
    debug: process.env.NODE_ENV === 'development',
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    useSecureCookies: true
} satisfies NextAuthOptions

export const serverSession = async () => await getServerSession(authOptions)