import { prisma } from "@/lib/prisma"
import { executeQuery } from '@/lib/db'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password, isGoogleUser = false } = await req.json()
    
    // Only hash password if it's provided (email/password registration)
    const passwordHash = password ? await hash(password, 12) : null

    const user = await executeQuery(
      () => prisma.user.create({
        data: {
          email,
          passwordHash,
          role: "GUEST",
          isGoogleUser
        },
        select: {
          id: true,
          email: true,
          role: true
        }
      }),
      'Failed to create user'
    )

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('Registration error:', err)
    return new NextResponse(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Registration failed'
      }),
      { status: 500 }
    )
  }
}