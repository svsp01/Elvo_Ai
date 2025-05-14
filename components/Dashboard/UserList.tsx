import { fetchAllUsers } from '@/lib/users';
import { useQuery } from '@tanstack/react-query';

// Component where React Query fetches data
const UserList = ({ initialData }: { initialData: any }) => {
  // useQuery hook with correct usage
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    initialData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {data?.users?.map((user: { id: string; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
