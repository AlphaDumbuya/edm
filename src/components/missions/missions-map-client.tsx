import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export interface MissionsMapClientProps {
  mapId: string;
}

const MissionsMapClient = ({ mapId }: MissionsMapClientProps) => {
  const libraries = useMemo(() => ['places'], []);
  const mapContainerStyle = useMemo(() => ({
    width: '100%',
    height: '400px', // Adjust height as needed
  }), []);

  const center = useMemo(() => ({
    lat: 8.4606, // Default latitude (e.g., Freetown, Sierra Leone)
    lng: 13.2028, // Default longitude
  }), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
      {/* Add markers here */}
      {/* <Marker position={{ lat: ..., lng: ... }} /> */}
    </GoogleMap>
  );
};

export default MissionsMapClient;