// src/components/layout/app-providers.tsx
'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/auth-context';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  // No longer using Google Maps API Provider here.

  // For now, always return children to avoid build issues if key is not set.
  // The map component itself will handle the API key check.
  return <AuthProvider>{children}</AuthProvider>;
}
