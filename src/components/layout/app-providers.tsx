// src/components/layout/app-providers.tsx
'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/auth-context';
// import { APIProvider } from '@vis.gl/react-google-maps'; // This will be uncommented once API key is handled

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Corrected variable name

  // If API key is available, wrap with APIProvider. Otherwise, just return children.
  // This allows the app to run without a Maps API key, degrading gracefully.
  // if (googleMapsApiKey) {
  //   return <AuthProvider><APIProvider apiKey={googleMapsApiKey}>{children}</APIProvider></AuthProvider>;
  // }

  // For now, always return children to avoid build issues if key is not set.
  // The map component itself will handle the API key check.
  return <AuthProvider>{children}</AuthProvider>;
}
