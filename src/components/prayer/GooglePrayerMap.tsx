import { useEffect, useRef } from 'react';
import { useGoogleMaps } from '@/lib/google-maps';

interface PrayerLocation {
  lat: number;
  lng: number;
  label: string;
}

export default function GooglePrayerMap({ locations }: { locations: PrayerLocation[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const isLoaded = useGoogleMaps();

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: locations[0] || { lat: 8.484, lng: -13.234 },
      zoom: 2,
    });

    locations.forEach(loc => {
      new window.google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map,
        title: loc.label,
      });
    });
  }, [locations, isLoaded]);

  return (
    <div className="my-8">
      <div className="w-full max-w-none bg-white rounded-lg shadow border border-blue-100 p-4 sm:p-6 xl:flex xl:items-start xl:gap-8">
        <div className="flex-1 min-w-0 xl:pr-8">
          <h2 className="text-xl font-semibold mb-1 text-blue-900">Interactive Prayer Map</h2>
          <p className="text-blue-700 mb-4 text-sm">See where prayers are being lifted up around the world.</p>
          <div ref={mapRef} className="w-full" style={{ height: 400, minWidth: 0, borderRadius: 8, overflow: 'hidden' }} />
        </div>
      </div>
    </div>
  );
}
