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
  const [initialized, setInitialized] = useState(false);
  
  const [mounted, setMounted] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted on client
  if (!mounted) {
    return null;
  }

  // Check if API key exists (client-side only)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('Google Maps API key is not set in environment variables');
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <div className="text-center text-red-500">
          <p>Google Maps configuration error</p>
          <p className="text-sm mt-2">Missing API key</p>
        </div>
      </div>
    );
  }

  // Load Google Maps script (client-side only)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
    version: "weekly",
    region: 'SL',
    language: 'en',
    preventGoogleFontsLoading: true
  });

  // Handle initialization and loading status
  useEffect(() => {
    const status = { isLoaded, loadError, initialized };
    
    if (isLoaded && !initialized) {
      console.log('Google Maps initialized successfully');
      setInitialized(true);
    }
    
    if (loadError) {
      console.error('Google Maps failed to load:', {
        error: loadError.message,
        name: loadError.name,
        stack: loadError.stack
      });
    }
  }, [isLoaded, loadError, initialized]);

  if (!isLoaded) {
    return <Loading message="Loading Google Maps..." />;
  }

  if (loadError) {
    console.error('Error loading Google Maps:', loadError);
    return <ErrorMessage message={loadError.message || 'Failed to load Google Maps'} />;
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}
