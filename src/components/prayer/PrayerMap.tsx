import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

interface PrayerLocation {
  lat: number;
  lng: number;
  label: string;
}

export default function PrayerMap({ locations }: { locations: PrayerLocation[] }) {
  const [center, setCenter] = useState<[number, number]>([8.484, -13.234]); // Default: Sierra Leone

  useEffect(() => {
    if (locations.length > 0) {
      setCenter([locations[0].lat, locations[0].lng]);
    }
  }, [locations]);

  return (
    <div className="my-8">
      <h2 className="text-lg font-bold mb-2 text-blue-800">Interactive Prayer Map</h2>
      <div style={{ height: 350, width: '100%' }}>
        <Map center={center} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc, i) => (
            <Marker key={i} position={[loc.lat, loc.lng]} />
          ))}
        </Map>
      </div>
    </div>
  );
}
