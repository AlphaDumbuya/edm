import UserManagementClient from './user-management-client'; // Ensure this import is correct
import { getAllUsers } from '@/lib/db/users';
import { Suspense } from 'react';

const UserManagementPage = async () => {
  const data = await getAllUsers({}); // Fetch all users initially on the server
  const initialUsers = data.users as any;
  const initialTotalCount = data.totalCount;

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex flex-col items-center py-4 px-2 sm:px-4">
      <div className="w-full max-w-5xl bg-gray-900 text-gray-100 rounded-2xl shadow-2xl border border-gray-800 flex flex-col gap-8 p-4 sm:p-8 mt-4 mb-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-left">User Management</h1>
          <span className="text-xs text-gray-400 font-medium">Admin Panel</span>
        </header>
        <main className="w-full">
          <Suspense fallback={<div className="text-gray-400 text-sm">Loading...</div>}>
            <UserManagementClient initialUsers={initialUsers} initialTotalCount={initialTotalCount} />
          </Suspense>
        </main>
      </div>
    </section>
  );
};

export default UserManagementPage;