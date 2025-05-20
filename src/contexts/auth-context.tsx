// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname, ReadonlyURLSearchParams } from 'next/navigation'; // Added ReadonlyURLSearchParams
import { useToast } from '@/hooks/use-toast';

// This User type should align with what your /api/auth/session returns
// and what your Prisma User model (selectively) exposes.
export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  // photoURL?: string | null; // Keep if you plan to use Uploadthing for this
  // Add other fields as needed, e.g., roles
}

interface AuthContextType {
  user: User | null;
  loading: boolean; // Indicates loading of initial auth state
  error: string | null;
  signUp: (email: string, password_1: string, name: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password_1: string, searchParams?: ReadonlyURLSearchParams | null) => Promise<{ user: User | null; error: string | null }>; // Added searchParams
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
  const { toast } = useToast(); // Added toast
  const fetchSession = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log('Fetching session from:', '/api/auth/session'); // Added logging
    try {
      const response = await fetch('/api/auth/session');
      console.log('Session response status:', response.status, response.statusText); // Added logging

      if (response.ok) {
        const rawResponse = await response.text(); // Added logging
        console.log('Raw session response:', rawResponse); // Added logging
        try {
          const data = JSON.parse(rawResponse); // Manually parse to handle potential errors
          setUser(data.user || null);
        } catch (e: any) {
          console.error('Failed to parse session JSON:', e); // Added error logging
          setError('Failed to parse session data.');
          setUser(null);
        }
      } else {
        setUser(null);
        if (response.status !== 401 && response.status !== 404) {
          const rawErrorResponse = await response.text(); // Added logging
          console.log('Raw error response:', rawErrorResponse); // Added logging
          try {
            const errData = JSON.parse(rawErrorResponse); // Manually parse to handle potential errors
            setError(errData.error || 'Failed to fetch session');
          } catch (e: any) {
            console.error('Failed to parse error JSON:', e); // Added error logging
            setError('Failed to parse error data.');
          }
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
  }, [fetchSession, pathname]);

  const signUp = async (email: string, password_1: string, name: string) => {
    setLoading(true);
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

  const signIn = async (email: string, password_1: string, searchParams?: ReadonlyURLSearchParams | null) => { // Added searchParams
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
        setUser(data.user);
        const redirectUrl = searchParams?.get('redirect') || '/dashboard'; // Handle redirect
        router.push(redirectUrl);
        router.refresh();
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
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/auth/login');
      router.refresh();
      return { error: null };
    } catch (e: any) {
      console.error("Logout API error:", e);
      setError(e.message || 'An error occurred during logout.');
      toast({ title: 'Logout Failed', description: e.message || 'An error occurred.', variant: 'destructive' });
      return { error: e.message || 'An error occurred during logout.' };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData: { name?: string; /* photoURL?: string */ }) => {
    if (!user) return { error: 'No user logged in' };
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', { // Assuming an API route for profile updates
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user); // Update user state with new profile data
        toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
        return { error: null };
      } else {
        setError(data.error || 'Profile update failed');
        toast({ title: 'Update Failed', description: data.error || 'Could not update profile.', variant: 'destructive' });
        return { error: data.error || 'Profile update failed' };
      }
    } catch (e: any) {
      console.error("Profile update API error:", e);
      setError(e.message || 'An error occurred during profile update.');
      toast({ title: 'Update Error', description: e.message || 'An error occurred.', variant: 'destructive' });
      return { error: e.message || 'An error occurred during profile update.' };
    } finally {
      setLoading(false);
    }
  };
  
  const refreshUser = async () => {
    await fetchSession();
  };

  const sendPasswordReset = async (email_1: string) => {
     setLoading(true);
     setError(null);
     try {
       const response = await fetch('/api/auth/forgot-password', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email: email_1 }),
       });
       const data = await response.json();
       if (response.ok) {
         toast({ title: 'Password Reset Email Sent', description: data.message || 'If an account exists, a reset link has been sent.'});
         return { error: null };
       } else {
         setError(data.error || 'Failed to send password reset email.');
         toast({ title: 'Error', description: data.error || 'Failed to send password reset email.', variant: 'destructive' });
         return { error: data.error || 'Failed to send password reset email.' };
       }
     } catch (e: any) {
       console.error("Password reset API error:", e);
       setError(e.message || 'An error occurred.');
       toast({ title: 'Error', description: e.message || 'An error occurred.', variant: 'destructive' });
       return { error: e.message || 'An error occurred.' };
     } finally {
       setLoading(false);
     }
  };

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
