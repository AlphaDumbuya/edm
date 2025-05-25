import UserManagementClient from './user-management-client'; // Ensure this import is correct
import { getAllUsers } from '@/lib/db/users';

const UserManagementPage = async () => {
  const data = await getAllUsers({}); // Fetch all users initially on the server
  const initialUsers = data.users as any;
  const initialTotalCount = data.totalCount;

  return (
    <div>
      <h1>User Management</h1>
      <UserManagementClient initialUsers={initialUsers} initialTotalCount={initialTotalCount} />
    </div>
  );
};

export default UserManagementPage;