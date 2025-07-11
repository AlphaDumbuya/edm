'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useSession } from 'next-auth/react';

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER' | 'USER';

interface UserData { id: string; name: string | null; email: string; role: UserRole }
export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const { refreshUser } = useAuth();
  const currentUserRole = session?.user?.role;
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Set loading to true at the start of fetch
        console.log('Fetching user data from API for ID:', userId);
        const response = await fetch(`/api/admin/users/${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch user data');
        } else {
          const user = await response.json();
          console.log('API fetch result:', user);
          if (user) {
            setName(user.name || '');
            setEmail(user.email);
          } else {
            setError('User not found'); // Should not happen if API returns 200, but as a fallback
          }
        }
      } catch (err) {
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
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT', // Or PATCH, depending on your API route implementation
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      // If the API returns the updated user, you might want to use it
      // const updatedUser = await response.json();
      // console.log('User updated successfully:', updatedUser);

      refreshUser(); // Refresh current user's data in auth context
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
            onChange={(e) => setName(e.target.value)} // Changed from sm:text-sm to text-base, added py-2 px-3 for padding
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base py-2 px-3 h-10"
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
            onChange={(e) => setEmail(e.target.value)} // Changed from sm:text-sm to text-base, added py-2 px-3 for padding
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base py-2 px-3 h-10"
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