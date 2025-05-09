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

const missionLocations: MissionLocation[] = [
  { id: '1', position: { lat: -1.2921, lng: 36.8219 }, name: 'Nairobi, Kenya Hub', description: 'Coordinating East Africa initiatives, leadership training center.', country: 'Kenya' },
  { id: '2', position: { lat: 13.7563, lng: 100.5018 }, name: 'Bangkok, Thailand Outreach', description: 'Urban evangelism and support for local church planters.', country: 'Thailand' },
  { id: '3', position: { lat: -12.0464, lng: -77.0428 }, name: 'Lima, Peru Project', description: 'Community development and children\'s ministry programs.', country: 'Peru' },
  { id: '4', position: { lat: 6.5244, lng: 3.3792 }, name: 'Lagos, Nigeria Mission', description: 'Church planting and discipleship programs in urban areas.', country: 'Nigeria' },
  { id: '5', position: { lat: 23.6345, lng: -102.5528 }, name: 'Mexico Rural Support', description: 'Supporting indigenous pastors and providing resources.', country: 'Mexico' },
];

export default function MissionsMapClient() {
  const [selectedLocation, setSelectedLocation] = useState<MissionLocation | null>(null);
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    setMapReady(true); // Assume map is ready to try rendering
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
          defaultCenter={{ lat: 10, lng: 0 }}
          defaultZoom={2}
          mapId="edm_connect_missions_map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
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
