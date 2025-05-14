import { prisma } from './prisma';
import { User } from '@prisma/client'; // TypeScript type for User model

// Function to fetch all users from the database
export const fetchAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

// Function to create a new user
export const createUser = async (userData: { name: string; email?: string }): Promise<User> => {
  return prisma.user.create({
    data: userData,
  });
};

// Additional user-related services can go here
