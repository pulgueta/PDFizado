import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { verify } from '@node-rs/argon2';

import { db } from '~/database/db';
import { loginSchema } from '~/schemas';
import { env } from '~/env/server.mjs';

export default {
	providers: [
		Credentials({
			authorize: async (credentials) => {
				const data = loginSchema.safeParse(credentials);

				if (data.success) {
					const { email, password } = data.data;

					const user = await db.user.findUnique({ where: { email } });

					if (!user || !user.password) return null;

					const matches = await verify(user.password, password);

					if (matches) return user;
				}

				return null;
			},
		}),
		Google({
			clientId: env.GOOGLE_PUBLIC,
			clientSecret: env.GOOGLE_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
	],
} satisfies NextAuthConfig;
