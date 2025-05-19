'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Optional: Fix default icon issue in Next.js
import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function MissionsMapClient() {
  return (
    <MapContainer
      center={[6.5244, 3.3792]} // Lagos, Nigeria (example)
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[6.5244, 3.3792]}>
        <Popup>This is Lagos!</Popup>
      </Marker>
    </MapContainer>
  );
}
