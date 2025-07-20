// src/components/layout/app-providers.tsx
'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import { GoogleMapsProvider } from '@/contexts/google-maps-context';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <GoogleMapsProvider>
        {children}
      </GoogleMapsProvider>
    </AuthProvider>
  );
}
