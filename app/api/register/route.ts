import { NextRequest, NextResponse } from "next/server";

import { hash } from "bcrypt";

import { db } from "@/database/db";

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') return new NextResponse('Method not allowed', { status: 405 })

    const body = await req.json()
    const { name, email, password } = body

    if (!name) return new NextResponse('Name is missing', { status: 400 })
    if (!email) return new NextResponse('Email is missing', { status: 400 })
    if (!password) return new NextResponse('Password is missing', { status: 400 })

    const userExists = await db.user.findUnique({
        where: { email }
    })

    if (userExists) return new NextResponse('Email is already in use', { status: 400 })

    const hashedPassword = await hash(password, 12)

    const { password: userPassword, ...rest } = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        }
    })

    return NextResponse.json(rest, { status: 201 })
}