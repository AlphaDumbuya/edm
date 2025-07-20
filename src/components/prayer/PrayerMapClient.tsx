import React, { useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from '@/contexts/google-maps-context';

interface PrayerMapClientProps {
  locations: { lat: number; lng: number; label: string }[];
  zoom?: number;
}

const PrayerMapClient: React.FC<PrayerMapClientProps> = ({ locations, zoom = 10 }) => {
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

  const { isLoaded, loadError } = useGoogleMaps();

  if (loadError) {
    console.error('Error loading map:', loadError);
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-100 rounded-lg">
        <p className="text-red-500">Error loading map. Please try again later.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-100 rounded-lg">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
      {locations.map((loc, idx) => (
        <Marker key={idx} position={{ lat: loc.lat, lng: loc.lng }} label={loc.label} />
      ))}
    </GoogleMap>
  );
};

export default PrayerMapClient;
