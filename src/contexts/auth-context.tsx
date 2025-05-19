// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// This User type should align with what your /api/auth/session returns
// and what your Prisma User model (selectively) exposes.
export interface User {
  id: string;
  email?: string | null;
  name?: string | null; // Changed from displayName
  // photoURL?: string | null; // Keep if you plan to use Uploadthing for this
  // Add other fields as needed, e.g., roles
}

interface AuthContextType {
  user: User | null;
  loading: boolean; // Indicates loading of initial auth state
  error: string | null;
  signUp: (email: string, password_1: string, name: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password_1: string) => Promise<{ user: User | null; error: string | null }>;
  signOutAuth: () => Promise<{ error: string | null }>;
  updateUserProfile: (profileData: { name?: string; /* photoURL?: string */ }) => Promise<{ error: string | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  refreshUser: () => Promise<void>; // To manually re-fetch session
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchSession = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user || null);
      } else {
        setUser(null);
        // Don't throw an error if session simply doesn't exist
        if (response.status !== 401 && response.status !== 404) {
          const errData = await response.json();
          setError(errData.error || 'Failed to fetch session');
        }
      }
    } catch (e: any) {
      console.error("Error fetching session:", e);
      setError(e.message || 'An error occurred while fetching session.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession, pathname]); // Re-fetch session if path changes, could be useful after login/logout redirects

  const signUp = async (email: string, password_1: string, name: string) => {
    setError(null);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password_1, name }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        return { user: data.user, error: null };
      } else {
        setError(data.error || 'Signup failed');
        return { user: null, error: data.error || 'Signup failed' };
      }
    } catch (e: any) {
      console.error("Signup API error:", e);
      setError(e.message || 'An error occurred during signup.');
      return { user: null, error: e.message || 'An error occurred during signup.' };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password_1: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password_1 }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user); // Assuming login API returns the user object
        return { user: data.user, error: null };
      } else {
        setError(data.error || 'Login failed');
        return { user: null, error: data.error || 'Login failed' };
      }
    } catch (e: any) {
      console.error("Login API error:", e);
      setError(e.message || 'An error occurred during login.');
      return { user: null, error: e.message || 'An error occurred during login.' };
    } finally {
      setLoading(false);
    }
  };

  const signOutAuth = async () => {
    setError(null);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/auth/login'); // Redirect to login page after logout
      router.refresh();
      return { error: null };
    } catch (e: any) {
      console.error("Logout API error:", e);
      setError(e.message || 'An error occurred during logout.');
      return { error: e.message || 'An error occurred during logout.' };
    }
  };

  const updateUserProfile = async (profileData: { name?: string; /* photoURL?: string */ }) => {
    if (!user) return { error: 'No user logged in' };
    setError(null);
    // TODO: Implement API route for profile update and call it here
    console.warn("Attempted to call updateUserProfile. Neon DB/Prisma integration needed for profile updates.");
    // Optimistic update example (remove or replace with actual API call and re-fetch)
    // setUser(prevUser => prevUser ? { ...prevUser, name: profileData.name ?? prevUser.name } : null);
    return { error: "User profile update functionality is not yet implemented with Neon DB." };
  };
  
  const refreshUser = async () => {
    await fetchSession();
  };

  const sendPasswordReset = async (email_1: string) => {
    setError("Password reset functionality is not yet implemented with Brevo.");
    console.warn("Attempted to call sendPasswordReset. Brevo integration needed.");
    return { error: "Password reset functionality is not yet implemented with Brevo." };
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOutAuth, updateUserProfile, refreshUser, sendPasswordReset }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
