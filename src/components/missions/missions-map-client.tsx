import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

export interface MissionsMapClientProps {
  mapId: string;
}

const MissionsMapClient = ({ mapId }: MissionsMapClientProps) => {
  const libraries = useMemo(() => ['places'], []);
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  // DEBUG: Show API key in console
  console.log('MissionsMapClient API KEY:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const [activeMarker, setActiveMarker] = React.useState<string | null>(null);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={3}>
      <Marker position={usOffice} onClick={() => setActiveMarker('us')} />
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