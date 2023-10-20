'use client'

import { SessionProvider } from "next-auth/react"

import type { Layout } from "@/types"

export const AuthProvider: React.FC<Layout> = ({ children }) => <SessionProvider>{children}</SessionProvider>