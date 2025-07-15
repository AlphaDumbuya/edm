import { UserManagementClient } from './user-management-client';
import { getAllUsersAction } from './actions';
import { Suspense } from 'react';

const UserManagementPage = async () => {
  const response = await getAllUsersAction({
    limit: 10,
    orderBy: { createdAt: 'desc' }
  });
  const initialUsers = response.success && response.data ? response.data.users : [];
  const initialTotalCount = response.success && response.data ? response.data.totalCount : 0;

  return (
    <div>
      <h1>User Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserManagementClient initialUsers={initialUsers} initialTotalCount={initialTotalCount} />
 </Suspense>
    </div>
  );
};

export default UserManagementPage;