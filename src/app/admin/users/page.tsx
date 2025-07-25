import { UserManagementClient } from './user-management-client';
import { getAllUsersAction } from './actions';
import { Suspense } from 'react';
import { AppUser } from '@/lib/db/users';

export default async function UserManagementPage() {
  let users: AppUser[] = [];
  let totalCount = 0;

  try {
    const response = await getAllUsersAction({
      limit: 10,
      orderBy: { createdAt: 'desc' }
    });

    if (response.success && response.data) {
      users = response.data.users;
      totalCount = response.data.totalCount;
    } else {
      console.error('Failed to fetch users:', response);
    }
  } catch (error) {
    console.error('Error in UserManagementPage:', error);
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex flex-col items-center py-4 px-2 sm:px-4">
      <div className="w-full max-w-5xl bg-gray-900 text-gray-100 rounded-2xl shadow-2xl border border-gray-800 flex flex-col gap-8 p-4 sm:p-8 mt-4 mb-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-left">User Management</h1>
          <span className="text-xs text-gray-400 font-medium">Admin Panel</span>
        </header>
        <main className="w-full">
          {users.length === 0 && <div className="text-red-400 text-center py-4">No users found. {totalCount === 0 ? 'Failed to load users. Please try again later.' : ''}</div>}
          <Suspense fallback={<div className="text-gray-400 text-sm">Loading...</div>}>
            <UserManagementClient 
              initialUsers={users || []} 
              initialTotalCount={totalCount || 0} 
            />
          </Suspense>
        </main>
      </div>
    </section>
  );
}