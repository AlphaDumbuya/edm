
import PageHeader from '@/components/shared/page-header';
import MissionsMapClient from '@/components/missions/missions-map-client';
import { Globe2 } from 'lucide-react';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const missionRegions = [
  {
    name: 'Sierra Leone Operations (EDM HQ)',
    description: 'Our primary hub in Freetown, focused on evangelism, discipleship training, church planting, and community development across Sierra Leone. Home to our future EDM Campus project.',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'sierra leone freetown cityscape',
    focusAreas: ['Evangelism & Outreach', 'Discipleship & Leadership Training', 'Church Planting Support', 'EDM Campus Development (School, Retreat Center)'],
    countryFlags: ['🇸🇱']
  },
  {
    name: 'Ohio, USA Partnership Hub',
    description: 'Coordinating with US churches and organizations in Ohio to support EDM\'s Sierra Leonean initiatives through prayer, resources, and fostering cross-cultural discipleship.',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'ohio state house columbus',
    focusAreas: ['Partner Mobilization & Support', 'Resource Development for SL', 'Advocacy & Awareness for EDM', 'US-based Training Coordination'],
    countryFlags: ['🇺🇸']
  },
  {
    name: 'Regional Evangelism (West Africa)',
    description: 'Extending EDM\'s evangelistic reach into neighboring West African countries through short-term missions, leadership conferences, and partnerships with local leaders, supported by our Freetown base.',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'west africa village scene',
    focusAreas: ['Leadership Conferences', 'Gospel Crusades & "Jesus" Film Showings', 'Resource Distribution', 'Pioneer Missions'],
    countryFlags: ['🇬🇳', '🇱🇷', '🇨🇮'] // Example: Guinea, Liberia, Ivory Coast
  },
];

export default function MissionsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Mission Fields"
        subtitle="Showcasing our work of Evangelism, Discipleship, and Missions in Sierra Leone and our collaborative efforts with partners in Ohio, USA."
        icon={Globe2}
      />

      <section>
        <SectionTitle title="Interactive Missions Map" subtitle="Explore EDM's reach and impact in Sierra Leone and Ohio" />
        <p className="text-muted-foreground mb-6 text-center">
          Use the map below to see where EDM teams are working and where our key partnerships are located. Click on markers for more information.
          (Note: Map functionality requires a Google Maps API key to be configured.)
        </p>
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <div className="aspect-[16/9] md:aspect-[2/1] bg-muted rounded-lg overflow-hidden">
              <MissionsMapClient mapId="edm_missions_map" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionTitle title="Featured Mission Regions" subtitle="Highlights of EDM's key areas of focus" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionRegions.map(region => (
            <Card key={region.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={region.imageUrl} alt={region.name} layout="fill" objectFit="cover" data-ai-hint={region.dataAiHint} />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{region.name} <span className="text-2xl ml-2">{region.countryFlags.join(' ')}</span></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{region.description}</p>
                <h4 className="font-semibold text-sm text-foreground mb-1">Focus Areas:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {region.focusAreas.map(area => <li key={area}>{area}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
