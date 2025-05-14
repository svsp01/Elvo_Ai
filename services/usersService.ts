import { User } from '@prisma/client';
import axiosInstance from './api/axiosInstance';

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

// Fetch a single user by ID
export const getUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};
