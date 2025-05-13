import { PrismaClient } from '@prisma/client'
import { prisma } from './prisma'

export class DatabaseError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export async function connectToDatabase(): Promise<PrismaClient> {
  try {
    await prisma.$connect()
    return prisma
  } catch (error) {
    throw new DatabaseError('Failed to connect to database', 'CONNECTION_ERROR')
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  try {
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
}

export async function executeQuery<T>(
  queryFn: () => Promise<T>,
  errorMessage = 'Database operation failed'
): Promise<T> {
  try {
    return await queryFn()
  } catch (error) {
    console.error('Database query error:', error)
    throw new DatabaseError(errorMessage)
  }
}