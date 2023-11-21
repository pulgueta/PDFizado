'use client';

import { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

export const AuthProvider = ({ children }: PropsWithChildren) => (
	<SessionProvider>{children}</SessionProvider>
);
