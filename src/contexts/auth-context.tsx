// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname, ReadonlyURLSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  emailVerified?: boolean; // Assuming this might come from session
  metadata?: { creationTime?: string }; // Example, if you store this
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password_1: string, name: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password_1: string, searchParams?: ReadonlyURLSearchParams | null) => Promise<{ user: User | null; error: string | null }>;
  signOutAuth: () => Promise<{ error: string | null }>;
  updateUserProfile: (profileData: { name?: string; /* photoURL?: string */ }) => Promise<{ error: string | null }>;
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
        // Don't set error for 401/404 on session fetch, it just means no active session
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
  }, [fetchSession, pathname]); // Re-fetch session on path change if needed

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
        } catch (e) { /* ignore if error response isn't json */ }
        setError(errorMsg);
        return { user: null, error: errorMsg };
      }

      const data = await response.json();
      setUser(data.user);
      // Typically, after signup, user is auto-logged in, so redirect to dashboard
      router.push('/dashboard'); 
      router.refresh(); // Ensures middleware re-evaluates for protected routes
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

  const signIn = async (email: string, password_1: string, searchParams?: ReadonlyURLSearchParams | null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password_1 }),
      });

      if (!response.ok) {
        let errorMsg = `Login failed: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          // If parsing error JSON fails, stick with the status text or a generic message
          console.warn("Failed to parse error response as JSON during sign-in:", e);
        }
        setError(errorMsg);
        toast({ title: 'Login Failed', description: errorMsg, variant: 'destructive' });
        return { user: null, error: errorMsg };
      }

      const data = await response.json();
      setUser(data.user);
      const redirectUrl = searchParams?.get('redirect') || '/dashboard';
      router.push(redirectUrl);
      router.refresh();
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

  const updateUserProfile = async (profileData: { name?: string; /* photoURL?: string */ }) => {
    if (!user) return { error: 'No user logged in' };
    setError(null);
    setLoading(true);
    // This needs an API endpoint, e.g., /api/user/profile
    // For now, this is a placeholder as the endpoint is not implemented
    console.warn("updateUserProfile: API endpoint not implemented. Simulating local update.");
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser); 
    setLoading(false);
    toast({ title: 'Profile Updated (Locally)', description: 'Your profile information has been saved (simulated).' });
    return { error: null }; 
    // TODO: Implement /api/user/profile PUT endpoint
  };
  
  const refreshUser = async () => {
    await fetchSession();
  };

  const sendPasswordReset = async (email_1: string) => {
     setLoading(true);
     setError(null);
     // TODO: Implement actual password reset email sending via Brevo
     console.warn("sendPasswordReset: Email sending not implemented yet. Using placeholder logic.");
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
     setLoading(false);
     toast({ title: 'Password Reset Email Sent (Placeholder)', description: 'If an account exists for this email, a password reset link would have been sent.'});
     return { error: null };
     // Placeholder for Brevo integration
     // try {
     //   const response = await fetch('/api/auth/forgot-password', {
     //     method: 'POST',
     //     headers: { 'Content-Type': 'application/json' },
     //     body: JSON.stringify({ email: email_1 }),
     //   });
     //   const data = await response.json();
     //   if (response.ok) {
     //     toast({ title: 'Password Reset Email Sent', description: data.message || 'If an account exists, a reset link has been sent.'});
     //     return { error: null };
     //   } else {
     //     setError(data.error || 'Failed to send password reset email.');
     //     toast({ title: 'Error', description: data.error || 'Failed to send password reset email.', variant: 'destructive' });
     //     return { error: data.error || 'Failed to send password reset email.' };
     //   }
     // } catch (e: any) {
     //   console.error("Password reset API error:", e);
     //   setError(e.message || 'An error occurred.');
     //   toast({ title: 'Error', description: e.message || 'An error occurred.', variant: 'destructive' });
     //   return { error: e.message || 'An error occurred.' };
     // } finally {
     //   setLoading(false);
     // }
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
