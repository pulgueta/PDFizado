'use client'

import { useRouter } from "next/navigation"

import { useSession } from 'next-auth/react'

import { Card } from "@/components/ui/card"
import { LoginForm } from "@/components/form/login-form"

const Login = () => {
    const { push } = useRouter()
    const { status, data } = useSession()

    console.log(data, status);

    if (status === 'authenticated') {
        push('/dashboard')
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#131110] flex items-center justify-center p-4">
            <Card className="w-auto md:w-[512px]">
                <LoginForm />
            </Card>
        </div>
    )
}
export default Login