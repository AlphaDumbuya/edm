// src/contexts/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define a basic User type, this can be expanded later
interface User {
  id: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  // Add other fields as needed from your Neon DB user table
}

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
  const [loading, setLoading] = useState(true); // Set to true initially, then false after checking auth status
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Placeholder for checking auth status (e.g., from a token in localStorage)
    // For now, we'll assume no user is logged in on initial load
    setLoading(false);
  }, []);

  const signUp = async (email: string, password_1: string) => {
    setError("Sign up functionality is not yet implemented with Neon DB.");
    console.warn("Attempted to call signUp. Firebase is removed. Implement with Neon DB.");
    return { user: null, error: "Sign up functionality is not yet implemented." };
  };

  const signIn = async (email: string, password_1: string) => {
    setError("Sign in functionality is not yet implemented with Neon DB.");
    console.warn("Attempted to call signIn. Firebase is removed. Implement with Neon DB.");
    return { user: null, error: "Sign in functionality is not yet implemented." };
  };

  const signOutAuth = async () => {
    setUser(null);
    // Clear any session/token information from localStorage if you implement token-based auth
    router.push('/');
    console.warn("Called signOutAuth. Firebase is removed. Ensure new auth logic clears session.");
    return { error: null };
  };

  const updateUserProfile = async (profileData: { displayName?: string; photoURL?: string }) => {
    if (!user) return { error: 'No user logged in' };
    setError("User profile update functionality is not yet implemented with Neon DB.");
    console.warn("Attempted to call updateUserProfile. Firebase is removed. Implement with Neon DB.");
    // Potentially update local state optimistically, then sync with backend
    // For now, just showing a warning
    // setUser(prevUser => prevUser ? { ...prevUser, ...profileData } : null);
    return { error: "User profile update functionality is not yet implemented." };
  };
  
  const refreshUser = async () => {
    // This would re-fetch user data from your Neon DB backend
    console.warn("Attempted to call refreshUser. Firebase is removed. Implement with Neon DB.");
  };

  const sendPasswordReset = async (email: string) => {
    setError("Password reset functionality is not yet implemented with Brevo.");
    console.warn("Attempted to call sendPasswordReset. Firebase is removed. Implement with Brevo.");
    return { error: "Password reset functionality is not yet implemented." };
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
