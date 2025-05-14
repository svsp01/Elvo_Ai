// src/services/api.ts

export async function fetchUsers() {
  const res = await fetch('http://localhost:3000/api/users');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}
