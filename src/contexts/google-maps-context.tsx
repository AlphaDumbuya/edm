'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadScriptProps, useLoadScript } from '@react-google-maps/api';
import { Loading, ErrorMessage } from '@/components/ui/loading';

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: undefined,
});

export const useGoogleMaps = () => useContext(GoogleMapsContext);

const libraries: LoadScriptProps['libraries'] = ['places'];

export function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  // State declarations - always declare hooks at the top level
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load script hook - must be called unconditionally
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
    version: "weekly",
    region: 'SL',
    language: 'en',
    preventGoogleFontsLoading: true
  });

  // Check API key and set mounted state
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not set in environment variables');
      setError('Google Maps configuration error: Missing API key');
    } else {
      setHasApiKey(true);
    }
    setMounted(true);
  }, []);

  // Handle Maps initialization
  useEffect(() => {
    if (mounted && isLoaded && !initialized) {
      console.log('Google Maps initialized successfully');
      setInitialized(true);
    }
  }, [mounted, isLoaded, initialized]);

  // Handle load errors
  useEffect(() => {
    if (mounted && loadError) {
      console.error('Google Maps failed to load:', {
        error: loadError.message,
        name: loadError.name,
        stack: loadError.stack
      });
      setError(loadError.message || 'Failed to load Google Maps');
    }
  }, [mounted, loadError]);

  // Early return for client-side only
  if (!mounted) {
    return null;
  }

  // Handle error states
  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!hasApiKey) {
    return <ErrorMessage message="Google Maps configuration error: Missing API key" />;
  }

  if (!isLoaded) {
    return <Loading message="Loading Google Maps..." />;
  }

  // Render the provider with children
  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}
