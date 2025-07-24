import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useGoogleMaps } from '@/lib/google-maps';

export interface MissionsMapClientProps {
  mapId: string;
}

const MissionsMapClient = ({ mapId }: MissionsMapClientProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isLoaded = useGoogleMaps();
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  // Sierra Leone HQ coordinates (from Google Maps: https://maps.google.com/maps?ll=8.387584,-13.1517581)
  const sierraLeoneHQ = { lat: 8.3876109, lng: -13.1517668 };
  // US Office coordinates (from Google Maps: https://maps.google.com/maps?ll=45.5092501,-122.5366013)
  const usOffice = { lat: 45.5092501, lng: -122.5366013 };
  // Center the map between both locations
  const center = useMemo(() => ({
    lat: (sierraLeoneHQ.lat + usOffice.lat) / 2,
    lng: (sierraLeoneHQ.lng + usOffice.lng) / 2,
  }), []);

  // Removed duplicate declaration

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 3,
    });

    const usMarker = new window.google.maps.Marker({
      position: usOffice,
      map,
      title: 'Oregon, USA Office',
    });

    const slMarker = new window.google.maps.Marker({
      position: sierraLeoneHQ,
      map,
      title: 'Sierra Leone HQ',
    });

    const usInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="min-width: 120px">
          <strong>Oregon, USA Office</strong>
          <br />12301 SE Stephens St<br />Portland, OR 97233
        </div>
      `,
    });

    const slInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="min-width: 120px">
          <strong>Sierra Leone HQ</strong>
          <br />66 Main Grafton Road<br />Kossoh Town, Freetown
        </div>
      `,
    });

    usMarker.addListener('click', () => {
      slInfoWindow.close();
      usInfoWindow.open(map, usMarker);
      setActiveMarker('us');
    });

    slMarker.addListener('click', () => {
      usInfoWindow.close();
      slInfoWindow.open(map, slMarker);
      setActiveMarker('sl');
    });

    // Close info windows when clicking on the map
    map.addListener('click', () => {
      usInfoWindow.close();
      slInfoWindow.close();
      setActiveMarker(null);
    });

  }, [isLoaded, center]);

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div ref={mapRef} style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }} />
  );
};

export default MissionsMapClient;