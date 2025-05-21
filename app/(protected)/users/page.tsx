import { Suspense } from 'react';
import { fetchUsers } from '@/services/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserTable from './components/client/UserTable';
import Loading from './loading';

export default async function UsersPage() {
  let users = [];
  let error = null;

  try {
    users = await fetchUsers();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch users';
    console.error('Error fetching users:', e);
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User List</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Loading />}>
            <UserTable users={users} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
