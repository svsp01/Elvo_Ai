import { NextRequest, NextResponse } from 'next/server';
import { fetchAllUsers, createUser } from '@/lib/users'; // Import functions from users service


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// GET route to fetch all users
export async function GET() {
  try {
    await delay(10000);
    const users = await fetchAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST route to create a new user
export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    const newUser = await createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
