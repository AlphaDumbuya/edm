'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { findUserById, updateUser } from "@/lib/db/users";
import { useSession } from 'next-auth/react';

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER' | 'USER';

interface UserData { id: string; name: string | null; email: string; role: UserRole }
export default function EditUserPage() {
  const params = useParams();
  const userId = params.userId as string;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const { fetchCurrentUser } = useAuth();
  const currentUserRole = session?.user?.role;
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await findUserById(userId) as UserData; // Cast to UserData
        if (user) {
          setName(user.name || '');
          setEmail(user.email);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUserData();
    } else {
      setError('User ID is missing');
      setLoading(false);
    }
  }, [userId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userId, { name, email });
      fetchCurrentUser(); // Refresh current user's data in auth context
      // Optional: show a success message
      console.log('User updated successfully');
      router.push('/admin/users'); // Redirect to user list
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user'); // Display an error message
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit User: {userId}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}