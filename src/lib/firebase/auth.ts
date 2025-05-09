// src/lib/firebase/auth.ts
// Removed 'use server'; directive as onAuthStateChanged is client-side and other functions are called from client context.

import type { User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './config';

// Sign Up
export async function signUpWithEmailAndPassword(email: string, password_1: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password_1);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

// Sign In
export async function signInWithEmail(email: string, password_1: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password_1);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

// Sign Out
export async function signOutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Get Current User (client-side)
export function onAuthStateChanged(callback: (user: User | null) => void) {
  return firebaseOnAuthStateChanged(auth, callback);
}

// Update User Profile
export async function updateUserProfile(user: User, profileData: { displayName?: string; photoURL?: string }) {
  try {
    await updateProfile(user, profileData);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Send Password Reset Email
export async function sendPasswordResetEmail(email: string) {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  return auth.currentUser;
}
