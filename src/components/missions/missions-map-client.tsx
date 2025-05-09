// src/components/missions/missions-map-client.tsx
'use client';

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

interface MissionLocation {
  id: string;
  position: { lat: number; lng: number };
  name: string;
  description: string;
  country: string;
}

// Updated mission locations for Sierra Leone and Ohio
const missionLocations: MissionLocation[] = [
  { id: '1', position: { lat: 8.4844, lng: -13.2344 }, name: 'EDM Headquarters - Freetown', description: 'Main operations center, coordinating all Sierra Leonean initiatives and international partnerships.', country: 'Sierra Leone' },
  { id: '2', position: { lat: 7.9503, lng: -11.8378 }, name: 'Bo District Project', description: 'Community development, agricultural support, and church planting in Bo District.', country: 'Sierra Leone' },
  { id: '3', position: { lat: 39.9612, lng: -82.9988 }, name: 'Columbus, Ohio Partnership Hub', description: 'Coordinating US partner engagement, resource mobilization, and awareness campaigns.', country: 'USA' },
  { id: '4', position: { lat: 8.6200, lng: -12.5700 }, name: 'Makeni Education Initiative', description: 'Supporting schools and providing educational resources in the Makeni area.', country: 'Sierra Leone' },
  { id: '5', position: { lat: 41.4993, lng: -81.6944 }, name: 'Cleveland, Ohio Outreach Support', description: 'Collaborating with local churches in Cleveland for joint outreach programs and discipleship training.', country: 'USA' },
];

interface MissionsMapClientProps {
  mapId?: string;
}

export default function MissionsMapClient({ mapId = "default_missions_map" }: MissionsMapClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<MissionLocation | null>(null);
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    setApiKey(key);
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return <div className="flex items-center justify-center h-full bg-muted"><p>Loading map...</p></div>;
  }
  
  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted p-8 text-center">
        <Globe className="w-16 h-16 text-destructive mb-4" />
        <h3 className="text-xl font-semibold text-destructive mb-2">Google Maps API Key Missing</h3>
        <p className="text-muted-foreground">
          To display the interactive missions map, a Google Maps API key is required.
          Please set the <code className="bg-destructive/20 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> environment variable.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          For now, mission locations cannot be displayed visually.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <Map
          defaultCenter={{ lat: 15.0, lng: -45.0 }} // Centered more broadly in the Atlantic, adjust as needed
          defaultZoom={3} // Adjusted zoom level
          mapId={mapId}
          gestureHandling={'greedy'}
          disableDefaultUI={false} // Re-enabled default UI for better navigation
          className="rounded-lg"
        >
          {missionLocations.map((location) => (
            <AdvancedMarker
              key={location.id}
              position={location.position}
              onClick={() => setSelectedLocation(location)}
            >
              <Pin
                background={'hsl(var(--primary))'}
                borderColor={'hsl(var(--primary-foreground))'}
                glyphColor={'hsl(var(--primary-foreground))'}
              />
            </AdvancedMarker>
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
              minWidth={250}
            >
              <Card className="border-none shadow-none p-0 m-0">
                <CardHeader className="p-2">
                  <CardTitle className="text-md text-primary">{selectedLocation.name}</CardTitle>
                  <CardDescription className="text-xs">{selectedLocation.country}</CardDescription>
                </CardHeader>
                <CardContent className="p-2 text-sm text-muted-foreground">
                  {selectedLocation.description}
                </CardContent>
              </Card>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

