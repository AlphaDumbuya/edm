// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  photoURL?: string | null;
  image?: string | null;
  role?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password_1: string, name: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password_1: string, searchParams: ReturnType<typeof useSearchParams>) => Promise<{ user: User | null; error: string | null }>;
  signOutAuth: () => Promise<{ error: string | null }>;
  updateUserProfile: (profileData: { name?: string; photoURL?: string }) => Promise<{ error: string | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  refreshUser: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const fetchSession = useCallback(async (isInitialLoad = false) => {
    if (!isInitialLoad) setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/session');
      const responseText = await response.text();
      if (response.ok) {
        if (responseText) {
          const data = JSON.parse(responseText);
          setUser(data.user || null);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
        try {
          const errorData = JSON.parse(responseText);
          setError(errorData.error || `Failed to fetch session: ${response.statusText}`);
        } catch (e) {
          setError(`Failed to fetch session: ${response.statusText}`);
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
    let result = { user: null, error: null };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password_1, name })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || `Signup failed: ${response.statusText}`;
        console.log('Signup failed:', { status: response.status, error: errorMessage });
        setError(errorMessage);
        result = { user: null, error: errorMessage };
        
        // Show toast for specific errors
        if (response.status === 409) {
          toast({ 
            title: 'Email Already Registered', 
            description: 'Please login or use a different email address.',
            variant: 'destructive'
          });
        } else {
          toast({ 
            title: 'Signup Failed', 
            description: errorMessage,
            variant: 'destructive'
          });
        }
      } else {
        console.log('Signup successful:', data);
        setUser(data.user || null);
        result = { user: data.user || null, error: null };
        
        // Only show success toast and redirect if actually successful
        toast({ 
          title: 'Signup Successful', 
          description: 'Please check your email and verify your account before logging in.'
        });
        router.push('/auth/verify?sent=1');
      }

    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred during signup.';
      console.error('Signup error:', e);
      setError(errorMessage);
      result = { user: null, error: errorMessage };
      toast({ 
        title: 'Signup Failed', 
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
    
    return result;
  };


  const signIn = async (email: string, password_1: string, searchParams: ReturnType<typeof useSearchParams>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password_1 })
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        const errorMsg = `Login failed: Server returned an invalid response.`;
        setError(errorMsg);
        toast({ title: 'Login Failed', description: errorMsg, variant: 'destructive' });
        setLoading(false);
        return { user: null, error: errorMsg };
      }

      if (!response.ok) {
        const errorMsg = data.error || `Login failed: ${response.statusText}`;
        setError(errorMsg);
        toast({ title: 'Login Failed', description: errorMsg, variant: 'destructive' });
        setLoading(false);
        return { user: null, error: errorMsg };
      }

      setUser(data.user);
      
      const redirectUrl = searchParams?.get('redirect') || '/';
      setLoading(false);
      
      // Use setTimeout to ensure state updates have propagated
      setTimeout(() => {
        toast({ title: 'Login Successful', description: 'Welcome back!' });
        router.push(redirectUrl);
        router.refresh();
      }, 100);
      
      return { user: data.user, error: null };

    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred during login.';
      setError(errorMessage);
      toast({ title: 'Login Error', description: errorMessage, variant: 'destructive' });
      setLoading(false);
      return { user: null, error: errorMessage };
    }
  };

  const signOutAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/');
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
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileData, userId: user.id })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update profile.');
      await fetchSession();
      toast({ title: 'Profile Updated', description: 'Your profile has been updated.' });
      return { error: null };
    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred while updating profile.';
      setError(errorMessage);
      toast({ title: 'Update Failed', description: errorMessage, variant: 'destructive' });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      const response = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send reset email.');
      toast({ title: 'Email Sent', description: 'Check your inbox for reset instructions.' });
      return { error: null };
    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred while sending reset email.';
      toast({ title: 'Reset Failed', description: errorMessage, variant: 'destructive' });
      return { error: errorMessage };
    }
  };

  const refreshUser = async () => fetchSession();
  const fetchCurrentUser = async () => fetchSession();

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOutAuth, updateUserProfile, sendPasswordReset, refreshUser, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};