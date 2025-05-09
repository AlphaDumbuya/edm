'use client';

import React from 'react';
// import { APIProvider } from '@vis.gl/react-google-maps'; // This will be uncommented once API key is handled

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // If API key is available, wrap with APIProvider. Otherwise, just return children.
  // This allows the app to run without a Maps API key, degrading gracefully.
  // if (googleMapsApiKey) {
  //   return <APIProvider apiKey={googleMapsApiKey}>{children}</APIProvider>;
  // }

  // For now, always return children to avoid build issues if key is not set.
  // The map component itself will handle the API key check.
  return <>{children}</>;
}
