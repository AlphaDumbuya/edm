
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
  type: 'EDM Hub' | 'Partnership Hub' | 'Ministry Focus Area';
}

const missionLocations: MissionLocation[] = [
  { id: '1', position: { lat: 8.4844, lng: -13.2344 }, name: 'EDM Headquarters - Freetown', description: 'Main operations center for EDM in Sierra Leone, coordinating evangelism, discipleship, and mission projects. Future site of the EDM Campus.', country: 'Sierra Leone', type: 'EDM Hub' },
  { id: '2', position: { lat: 7.9503, lng: -11.8378 }, name: 'Bo District Ministry Focus', description: 'Focus area for church planting, community development, and evangelistic outreach in Bo District.', country: 'Sierra Leone', type: 'Ministry Focus Area' },
  { id: '3', position: { lat: 40.0000, lng: -82.9988 }, name: 'Portland, Ohio Partnership Hub', description: 'Coordinating US partner engagement, resource mobilization, and awareness campaigns from our office at 12301 South East Stephens Street, Portland, Ohio 97233.', country: 'USA', type: 'Partnership Hub' }, // Updated lat for generic Portland, Ohio, and address
  { id: '4', position: { lat: 8.6200, lng: -12.5700 }, name: 'Makeni Education & Outreach', description: 'Supporting schools, providing educational resources, and conducting outreach in the Makeni area.', country: 'Sierra Leone', type: 'Ministry Focus Area' },
  { id: '5', position: { lat: 8.7832, lng: -11.3300 }, name: 'Kenema District Evangelism', description: 'Active evangelism and discipleship programs in Kenema District, expanding EDM\'s reach.', country: 'Sierra Leone', type: 'Ministry Focus Area' },
];

interface MissionsMapClientProps {
  mapId?: string;
}

export default function MissionsMapClient({ mapId = "default_missions_map" }: MissionsMapClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<MissionLocation | null>(null);
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    setApiKey(key);
    setMapReady(true); // Indicate that we are ready to attempt rendering the map
  }, []);

  if (!mapReady) {
    // Still determining if API key is present or not
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
          For now, mission locations cannot be displayed visually. Key locations include Freetown, Sierra Leone and Portland, Ohio, USA.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <Map
          defaultCenter={{ lat: 6.5, lng: -40.0 }} // Adjusted to center better between SL and Ohio
          defaultZoom={3} 
          mapId={mapId}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          className="rounded-lg"
        >
          {missionLocations.map((location) => (
            <AdvancedMarker
              key={location.id}
              position={location.position}
              onClick={() => setSelectedLocation(location)}
            >
              <Pin
                background={location.type === 'EDM Hub' ? 'hsl(var(--primary))' : location.type === 'Partnership Hub' ? 'hsl(var(--secondary))' : 'hsl(var(--accent))'}
                borderColor={'hsl(var(--background))'}
                glyphColor={location.type === 'EDM Hub' ? 'hsl(var(--primary-foreground))' : location.type === 'Partnership Hub' ? 'hsl(var(--secondary-foreground))' : 'hsl(var(--accent-foreground))'}
              />
            </AdvancedMarker>
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
              minWidth={250}
            >
              <Card className="border-none shadow-none p-0 m-0 max-w-xs">
                <CardHeader className="p-2">
                  <CardTitle className="text-md text-primary">{selectedLocation.name}</CardTitle>
                  <CardDescription className="text-xs">{selectedLocation.country} - {selectedLocation.type}</CardDescription>
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
