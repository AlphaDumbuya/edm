// src/lib/firebase/auth.ts
'use server'; // For potential use in Server Actions if needed, though primarily client-side for now

import type { User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile,
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

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
