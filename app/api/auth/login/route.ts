import { prisma } from "@/lib/prisma"
import { executeQuery } from '@/lib/db'
import { compare } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await executeQuery(
      () => prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          passwordHash: true,
          role: true,
          isGoogleUser: true
        }
      }),
      'Failed to find user'
    )

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      )
    }

    if (user.isGoogleUser) {
      return new NextResponse(
        JSON.stringify({ error: 'Please login with Google' }),
        { status: 400 }
      )
    }

    const isValid = await compare(password, user.passwordHash!)
    if (!isValid) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('Login error:', err)
    return new NextResponse(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Login failed'
      }),
      { status: 500 }
    )
  }
}