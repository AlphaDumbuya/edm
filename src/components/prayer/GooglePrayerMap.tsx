import { useEffect, useRef } from 'react';
import { useGoogleMaps } from '@/contexts/google-maps-context';

interface PrayerLocation {
  lat: number;
  lng: number;
  label: string;
}

export default function GooglePrayerMap({ locations }: { locations: PrayerLocation[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (!isLoaded || !window.google || !mapRef.current) return;
    
    // Default to Sierra Leone center if no locations
    const defaultCenter = { lat: 8.484, lng: -13.234 };
    const center = locations.length > 0 ? locations[0] : defaultCenter;
    
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: locations.length > 0 ? 2 : 6, // Closer zoom if no locations
    });
    
    if (locations.length > 0) {
      // Add markers only if we have locations
      locations.forEach(loc => {
        new window.google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.label,
        });
      });
    }
  }, [locations, isLoaded]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

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
