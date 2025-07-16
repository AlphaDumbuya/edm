import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface PrayerMapClientProps {
  locations: { lat: number; lng: number; label: string }[];
  zoom?: number;
}

const PrayerMapClient: React.FC<PrayerMapClientProps> = ({ locations, zoom = 10 }) => {
  const libraries = useMemo(() => ['places'], []);
  const mapContainerStyle = useMemo(() => ({
    width: '100%',
    height: '300px',
  }), []);

  // Center the map between all locations
  const center = useMemo(() => {
    if (locations.length === 1) return locations[0];
    const lat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
    const lng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
    return { lat, lng };
  }, [locations]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
      {locations.map((loc, idx) => (
        <Marker key={idx} position={{ lat: loc.lat, lng: loc.lng }} label={loc.label} />
      ))}
    </GoogleMap>
  );
};

export default PrayerMapClient;
