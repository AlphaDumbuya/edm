'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadScriptProps, useLoadScript } from '@react-google-maps/api';

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
  
  console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY); // Debug log
  
  // Debug logs for environment variable
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key is not set in environment variables');
    }
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
    version: "weekly",
    region: 'SL',
    language: 'en',
    preventGoogleFontsLoading: true
  });

  useEffect(() => {
    console.log('Maps loading status:', { isLoaded, loadError }); // Debug log
    if (isLoaded && !initialized) {
      setInitialized(true);
    }
  }, [isLoaded, initialized]);

  if (!initialized && !isLoaded) {
    console.log('Maps not initialized yet'); // Debug log
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600">Loading Maps...</p>
          <div className="mt-2 w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (loadError) {
    console.error('Error loading Google Maps:', loadError);
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <div className="text-center text-red-500">
          <p>Error loading Google Maps</p>
          <p className="text-sm mt-2">{loadError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}
