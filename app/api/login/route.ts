import { NextRequest, NextResponse } from "next/server"

import { compare } from "bcrypt"

import { db } from "@/database/db"
import { User } from "@prisma/client"

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') return NextResponse.json('Method not allowed', { status: 405 })

    const body = await req.json()
    const { email, password } = body

    if (!email) return new NextResponse('Email is missing', { status: 400 })
    if (!password) return new NextResponse('Password is missing', { status: 400 })

    const { password: userPassword, ...rest } = await db.user.findUnique({
        where: {
            email
        }
    }) as User


    if (rest && (await compare(password, userPassword))) {
        return NextResponse.json(rest, { status: 200 })
    } else {
        return NextResponse.json('Invalid credentials', { status: 401 })
    }
}