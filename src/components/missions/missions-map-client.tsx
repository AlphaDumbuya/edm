import React, { useMemo, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useGoogleMaps } from '@/contexts/google-maps-context';

export interface MissionsMapClientProps {
  mapId: string;
}

const MissionsMapClient = ({ mapId }: MissionsMapClientProps) => {
  const mapContainerStyle = useMemo(() => ({
    width: '100%',
    height: '400px', // Adjust height as needed
  }), []);

  // Sierra Leone HQ coordinates (from Google Maps: https://maps.google.com/maps?ll=8.387584,-13.1517581)
  const sierraLeoneHQ = { lat: 8.3876109, lng: -13.1517668 };
  // US Office coordinates (from Google Maps: https://maps.google.com/maps?ll=45.5092501,-122.5366013)
  const usOffice = { lat: 45.5092501, lng: -122.5366013 };
  // Center the map between both locations
  const center = useMemo(() => ({
    lat: (sierraLeoneHQ.lat + usOffice.lat) / 2,
    lng: (sierraLeoneHQ.lng + usOffice.lng) / 2,
  }), [sierraLeoneHQ, usOffice]);

  const { isLoaded, loadError } = useGoogleMaps();

  const [activeMarker, setActiveMarker] = React.useState<string | null>(null);

  useEffect(() => {
    console.log('MissionsMapClient loading status:', { isLoaded, loadError }); // Debug log
  }, [isLoaded, loadError]);

  if (loadError) {
    console.error('Error loading maps:', loadError);
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading maps</p>
          <p className="text-sm text-gray-600">{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    console.log('Maps still loading in MissionsMapClient'); // Debug log
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600">Loading Maps...</p>
          <div className="mt-2 w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      center={center} 
      zoom={3}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        gestureHandling: 'cooperative'
      }}
    >
      <Marker 
        position={usOffice} 
        onClick={() => setActiveMarker('us')}
        title="EDM USA Office"
      />
      {activeMarker === 'us' && (
        <InfoWindow position={usOffice} onCloseClick={() => setActiveMarker(null)}>
          <div style={{ minWidth: 120 }}>
            <strong>Oregon, USA Office</strong>
            <br />12301 SE Stephens St<br />Portland, OR 97233
          </div>
        </InfoWindow>
      )}
      <Marker position={sierraLeoneHQ} onClick={() => setActiveMarker('sl')} />
      {activeMarker === 'sl' && (
        <InfoWindow position={sierraLeoneHQ} onCloseClick={() => setActiveMarker(null)}>
          <div style={{ minWidth: 120 }}>
            <strong>Sierra Leone HQ</strong>
            <br />66 Main Grafton Road<br />Kossoh Town, Freetown
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MissionsMapClient;