
// src/components/missions/missions-map-client.tsx
'use client';

import dynamic from 'next/dynamic';

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
  { id: '3', position: { lat: 45.5231, lng: -122.6765 }, name: 'Portland, Oregon Partnership Hub', description: 'Coordinating US partner engagement, resource mobilization, and awareness campaigns from our office at 12301 South East Stephens Street, Portland, Oregon 97233.', country: 'USA', type: 'Partnership Hub' },
  { id: '4', position: { lat: 8.6200, lng: -12.5700 }, name: 'Makeni Education & Outreach', description: 'Supporting schools, providing educational resources, and conducting outreach in the Makeni area.', country: 'Sierra Leone', type: 'Ministry Focus Area' },
  { id: '5', position: { lat: 8.7832, lng: -11.3300 }, name: 'Kenema District Evangelism', description: 'Active evangelism and discipleship programs in Kenema District, expanding EDM\'s reach.', country: 'Sierra Leone', type: 'Ministry Focus Area' },
];

interface MissionsMapClientProps {
  mapId?: string;
}

export default function MissionsMapClient({ mapId = "default_missions_map" }: MissionsMapClientProps) {
 // Disable SSR (Leaflet requires the browser's window object)
  const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
  });

  return (
    // Render the dynamically imported LeafletMap component
    <LeafletMap />
  );
}
