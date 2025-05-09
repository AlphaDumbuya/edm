// src/contexts/auth-context.tsx
'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signUpWithEmailAndPassword, 
  signInWithEmail, 
  signOutUser, 
  updateUserProfile as firebaseUpdateUserProfile, 
  getCurrentUser as firebaseGetCurrentUser,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail
} from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

interface User extends FirebaseUser {}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password_1: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password_1: string) => Promise<{ user: User | null; error: string | null }>;
  signOutAuth: () => Promise<{ error: string | null }>;
  updateUserProfile: (profileData: { displayName?: string; photoURL?: string }) => Promise<{ error: string | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser as User | null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password_1: string) => {
    setLoading(true);
    setError(null);
    const result = await signUpWithEmailAndPassword(email, password_1);
    if (result.user) {
      setUser(result.user as User);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return { user: result.user as User | null, error: result.error };
  };

  const signIn = async (email: string, password_1: string) => {
    setLoading(true);
    setError(null);
    const result = await signInWithEmail(email, password_1);
    if (result.user) {
      setUser(result.user as User);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return { user: result.user as User | null, error: result.error };
  };

  const signOutAuth = async () => {
    setLoading(true);
    setError(null);
    const result = await signOutUser();
    if (result.error) {
      setError(result.error);
    } else {
      setUser(null);
      router.push('/'); // Redirect to home after sign out
    }
    setLoading(false);
    return result;
  };

  const updateUserProfile = async (profileData: { displayName?: string; photoURL?: string }) => {
    if (!user) return { error: 'No user logged in' };
    setLoading(true);
    setError(null);
    const result = await firebaseUpdateUserProfile(user, profileData);
    if (result.error) {
      setError(result.error);
    } else {
      // Refresh user state to reflect changes
      const updatedUser = await firebaseGetCurrentUser();
      setUser(updatedUser as User | null);
    }
    setLoading(false);
    return result;
  };
  
  const refreshUser = async () => {
    const currentUser = await firebaseGetCurrentUser();
    setUser(currentUser as User | null);
  };

  const sendPasswordReset = async (email: string) => {
    setLoading(true);
    setError(null);
    const result = await firebaseSendPasswordResetEmail(email);
     if (result.error) {
      setError(result.error);
    }
    setLoading(false);
    return result;
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
