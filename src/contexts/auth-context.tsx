// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname, ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password_1: string, name: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password_1: string) => Promise<{ user: User | null; error: string | null }>;
  signOutAuth: () => Promise<{ error: string | null }>;
  updateUserProfile: (profileData: { name?: string; photoURL?: string }) => Promise<{ error: string | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const fetchSession = useCallback(async (isInitialLoad = false) => {
    if (!isInitialLoad) setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user || null);
      } else {
        setUser(null);
        if (response.status !== 401) {
          const errorData = await response.json().catch(() => ({ error: `Failed to fetch session: ${response.statusText}` }));
          setError(errorData.error || `Failed to fetch session: ${response.statusText}`);
        }
      }
    } catch (e: any) {
      setError(e.message || 'An error occurred while fetching session.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession(true);
  }, [fetchSession]);

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

      if (!response.ok) {
        setError(data.error || `Signup failed: ${response.statusText}`);
        return { user: null, error: data.error || `Signup failed: ${response.statusText}` };
      }
      
      setUser(data.user);
      toast({ title: 'Signup Successful', description: 'Welcome! You are now logged in.' });
      router.push('/dashboard');
      await new Promise(resolve => setTimeout(resolve, 50)); // Short delay
      router.refresh();
      return { user: data.user, error: null };

    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred during signup.';
      setError(errorMessage);
      return { user: null, error: errorMessage };
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

      if (!response.ok) {
        const errorMsg = data.error || `Login failed: ${response.statusText}`;
        setError(errorMsg);
        toast({ title: 'Login Failed', description: errorMsg, variant: 'destructive' });
        return { user: null, error: errorMsg };
      }
      
      setUser(data.user); // Update client-side user state
      toast({ title: 'Login Successful', description: 'Welcome back!' });
      
      const redirectUrl = searchParams?.get('redirect') || '/dashboard';
      router.push(redirectUrl);
      // It's important router.refresh() runs to update server components and middleware state
      // A small delay can sometimes help ensure cookie propagation before refresh.
      await new Promise(resolve => setTimeout(resolve, 50)); 
      router.refresh(); 
      return { user: data.user, error: null };

    } catch (e: any) {
      console.error("Login API call error:", e);
      const errorMessage = e.message || 'An error occurred during login.';
      setError(errorMessage);
      toast({ title: 'Login Error', description: errorMessage, variant: 'destructive' });
      return { user: null, error: errorMessage };
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
      const errorMessage = e.message || 'An error occurred during logout.';
      setError(errorMessage);
      toast({ title: 'Logout Failed', description: errorMessage, variant: 'destructive' });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData: { name?: string; photoURL?: string }) => {
    if (!user) return { error: 'No user logged in' };
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement API call to your backend to update user in Neon DB
      // For now, simulate local update for UI feedback
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }
      
      // Optimistically update user state, or refresh from server
      setUser(prevUser => prevUser ? { ...prevUser, ...profileData } : null);
      await refreshUser(); // Re-fetch session to get latest user data
      toast({ title: 'Profile Updated', description: 'Your profile information has been saved.' });
      return { error: null };

    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred while updating profile.';
      setError(errorMessage);
      toast({ title: 'Profile Update Failed', description: errorMessage, variant: 'destructive' });
      return { error: errorMessage };
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
     console.warn("sendPasswordReset: Brevo email sending not implemented yet. Placeholder logic.");
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1000)); 
     setLoading(false);
     toast({ title: 'Password Reset Email (Placeholder)', description: 'If an account exists, a reset link would be sent.'});
     return { error: null };
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
