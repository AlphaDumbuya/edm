// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname, ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  emailVerified?: boolean;
  metadata?: { creationTime?: string };
  photoURL?: string | null; // Added for consistency with DashboardSidebar
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
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Get searchParams for redirect
  const { toast } = useToast();

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
        if (response.status !== 401 && response.status !== 404) {
            let errorMsg = `Failed to fetch session: ${response.statusText}`;
            try {
                const errData = await response.json();
                errorMsg = errData.error || errorMsg;
            } catch (e) { /* ignore if error response isn't json */ }
            setError(errorMsg);
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
      
      if (!response.ok) {
        let errorMsg = `Signup failed: ${response.statusText}`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
        } catch (e) { /* ignore */ }
        setError(errorMsg);
        return { user: null, error: errorMsg };
      }

      const data = await response.json();
      setUser(data.user);
      router.push('/dashboard'); 
      router.refresh(); 
      return { user: data.user, error: null };

    } catch (e: any) {
      console.error("Signup API call error:", e);
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

      if (!response.ok) {
        let errorMsg = `Login failed.`;
        if (response.headers.get('content-type')?.includes('application/json')) {
            try {
              const errorData = await response.json();
              errorMsg = errorData.error || `Login failed: ${response.statusText}`;
            } catch (e) {
              console.warn("Failed to parse error response as JSON during sign-in:", e);
              errorMsg = `Login failed with status: ${response.status}`;
            }
        } else {
            errorMsg = `Login failed: ${response.statusText} (${response.status})`;
        }
        setError(errorMsg);
        toast({ title: 'Login Failed', description: errorMsg, variant: 'destructive' });
        return { user: null, error: errorMsg };
      }

      const data = await response.json();
      setUser(data.user);
      const redirectUrl = searchParams?.get('redirect') || '/dashboard';
      router.push(redirectUrl);
      router.refresh(); // Ensure middleware re-evaluates
      toast({ title: 'Login Successful', description: 'Welcome back!' });
      return { user: data.user, error: null };

    } catch (e: any) {
      console.error("Login API call error (e.g., network issue or unparseable response):", e);
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
      console.error("Logout API error:", e);
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
    setError(null);
    setLoading(true);
    console.warn("updateUserProfile: API endpoint not implemented. Simulating local update.");
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser as User); // Cast as User after update
    setLoading(false);
    toast({ title: 'Profile Updated (Locally)', description: 'Your profile information has been saved (simulated).' });
    return { error: null }; 
  };
  
  const refreshUser = async () => {
    await fetchSession();
  };

  const sendPasswordReset = async (email_1: string) => {
     setLoading(true);
     setError(null);
     console.warn("sendPasswordReset: Email sending not implemented yet. Using placeholder logic.");
     await new Promise(resolve => setTimeout(resolve, 1000)); 
     setLoading(false);
     toast({ title: 'Password Reset Email Sent (Placeholder)', description: 'If an account exists for this email, a password reset link would have been sent.'});
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
