'use client'

import { useRouter } from "next/navigation"

import { useSession } from 'next-auth/react'

import { Card } from "@/components/ui/card"
import { RegisterForm } from "@/components/form/register-form"


const Register = () => {
    const { push } = useRouter()
    const { status } = useSession()

    if (status === 'authenticated') {
        push('/dashboard')
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#131110] flex items-center justify-center p-4">
            <Card className="w-auto md:w-[640px]">
                <RegisterForm />
            </Card>
        </div>
    )
}
export default Register