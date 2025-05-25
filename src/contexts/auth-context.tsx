// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname, ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  photoURL?: string | null; // We are not using this yet from custom auth
  // emailVerified?: boolean; // Not part of our custom session payload yet
  // metadata?: { creationTime?: string }; // Not part of our custom session payload yet
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
  const { toast } = useToast();
  const searchParams = useSearchParams(); // Moved useSearchParams to the top level

  const fetchSession = useCallback(async (isInitialLoad = false) => {
    if (!isInitialLoad) setLoading(true);
    setError(null);
    console.log('[AuthContext] fetchSession called. Initial load:', isInitialLoad);
    try {
      const response = await fetch('/api/auth/session');
      console.log('[AuthContext] /api/auth/session response status:', response.status);
      
      const responseText = await response.text();
      console.log('[AuthContext] /api/auth/session raw response text:', responseText.substring(0, 200) + (responseText.length > 200 ? "..." : ""));

      if (response.ok) {
        if (responseText) {
          const data = JSON.parse(responseText);
          console.log('[AuthContext] /api/auth/session parsed data:', data);
          setUser(data.user || null);
        } else {
          console.log('[AuthContext] /api/auth/session response was OK but empty. Setting user to null.');
          setUser(null);
        }
      } else {
        setUser(null);
        // Try to parse error if it's JSON
        try {
          const errorData = JSON.parse(responseText);
          console.error(`[AuthContext] Error fetching session. Status: ${response.status}, Error: ${errorData.error || responseText}`);
          setError(errorData.error || `Failed to fetch session: ${response.statusText}`);
        } catch (e) {
          console.error(`[AuthContext] Error fetching session. Status: ${response.status}, Text: ${responseText}`);
          setError(`Failed to fetch session: ${response.statusText} - ${responseText.substring(0,100)}`);
        }
      }
    } catch (e: any) {
      console.error('[AuthContext] Exception in fetchSession:', e.message);
      setError(e.message || 'An error occurred while fetching session.');
      setUser(null);
    } finally {
      setLoading(false);
      console.log('[AuthContext] fetchSession finished. Loading set to false. Current user state:', user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed `user` from deps to avoid loop based on stale closure


  useEffect(() => {
    fetchSession(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fetchSession is memoized with useCallback

  const signUp = async (email: string, password_1: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password_1, name }),
      });

      // Check if the response is a redirect (3xx status)
      if (response.redirected || (response.status >= 300 && response.status < 400)) { // Handles 302 Redirect
        // Handle successful signup and redirect
        toast({ title: 'Signup Successful', description: 'Please sign in with your new account.' });
        // Client-side redirect to login page if API didn't fully handle it
        router.push('/auth/login');
        setUser(null); // Ensure user state is null after signup
        return { user: null, error: null }; // Indicate success
      } else if (!response.ok) {
        // Handle API errors if not a redirect or not OK
        // Handle API errors if not a redirect
        const data = await response.json();
        const errorMessage = data.error || `Signup failed: ${response.statusText}`;
        setError(errorMessage);
        return { user: null, error: errorMessage };
      } else { // Handle unexpected non-redirect success responses (shouldn't happen with the current API)
        // If the API were to somehow return 200 with a user object, handle it here
        const data = await response.json();
        setUser(data.user || null);
        toast({ title: 'Signup Successful', description: 'Please sign in with your new account.' });
        router.push('/auth/login');
        return { user: data.user || null, error: null };
      }

    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred during signup.';
      setError(errorMessage);
      toast({ title: 'Signup Failed', description: errorMessage, variant: 'destructive' });
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
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError: any) {
        const errorMsg = `Login failed: Server returned an invalid response (status: ${response.status}). Check server logs.`;
        setError(errorMsg);
        toast({ title: 'Login Failed', description: 'An unexpected error occurred. Please try again.', variant: 'destructive' });
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
      
      setUser(data.user); // Set user state immediately
      toast({ title: 'Login Successful', description: 'Welcome back!' });

      const redirectUrl = searchParams?.get('redirect') || '/dashboard';
      router.push(redirectUrl);
      // Adding a delay before router.refresh() to allow cookie to settle and context to potentially update
      await new Promise(resolve => setTimeout(resolve, 150)); 
      router.refresh(); // This should trigger middleware with new cookie
      setLoading(false); // Ensure loading is false after navigation attempts
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
      router.push('/'); // Redirect to homepage
      // No need for router.refresh() here as middleware will handle the redirect from protected routes if any.
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
      // This API route needs to be implemented to update user in Neon DB
      const response = await fetch('/api/auth/profile', { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileData, userId: user.id }), // Send userId for server to identify user
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }
      
      await fetchSession(); // Refresh user data in context
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
  
  const refreshUser = useCallback(async () => {
    console.log('[AuthContext] refreshUser called, will call fetchSession.');
    await fetchSession();
  }, [fetchSession]);

  const sendPasswordReset = async (email_1: string) => {
     setLoading(true);
     setError(null);
     // TODO: Implement actual email sending with Brevo via an API route
     console.warn("[AuthContext] sendPasswordReset: Brevo email sending not implemented yet. Placeholder logic.");
     await new Promise(resolve => setTimeout(resolve, 1000)); 
     setLoading(false);
     toast({ title: 'Password Reset Email (Placeholder)', description: 'If an account exists, a reset link would be sent. (Brevo not yet integrated)'});
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
