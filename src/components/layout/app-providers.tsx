// src/components/layout/app-providers.tsx
'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/auth-context';
// Removed GoogleMapsProvider import

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  // The GoogleMapsProvider is no longer used here.
  // The map component itself (MissionsMapClient) now handles API key checks.
  return <AuthProvider>{children}</AuthProvider>;
}
