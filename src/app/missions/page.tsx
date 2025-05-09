import PageHeader from '@/components/shared/page-header';
import MissionsMapClient from '@/components/missions/missions-map-client';
import { Globe2 } from 'lucide-react';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const missionRegions = [
  {
    name: 'Sierra Leone Operations',
    description: 'Our primary hub, focused on community development, church planting, and leadership training across Sierra Leone. Projects range from Freetown urban centers to rural villages.',
    imageUrl: 'https://picsum.photos/seed/sierraleoneops/400/250',
    dataAiHint: 'sierra leone village people',
    focusAreas: ['Water Wells & Sanitation', 'Education Support', 'Healthcare Clinics', 'Church Planting'],
    countryFlags: ['🇸🇱']
  },
  {
    name: 'Ohio, USA Partnership Hub',
    description: 'Coordinating with US churches and organizations in Ohio to support our Sierra Leonean initiatives and foster cross-cultural discipleship and evangelism efforts.',
    imageUrl: 'https://picsum.photos/seed/ohiousa/400/250',
    dataAiHint: 'ohio city skyline',
    focusAreas: ['Partner Mobilization', 'Resource Development', 'Advocacy & Awareness', 'US-based Training'],
    countryFlags: ['🇺🇸']
  },
  {
    name: 'Regional Evangelism (West Africa)',
    description: 'Extending our evangelistic reach into neighboring West African countries through short-term missions and partnerships with local leaders, supported by our Freetown base.',
    imageUrl: 'https://picsum.photos/seed/westafrica/400/250',
    dataAiHint: 'west african market scene',
    focusAreas: ['Leadership Conferences', 'Gospel Crusades', 'Resource Distribution'],
    countryFlags: ['🇬🇳', '🇱🇷'] // Example: Guinea, Liberia
  },
];

export default function MissionsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Mission Fields"
        subtitle="Showcasing our work in Sierra Leone and our collaborative efforts with partners in Ohio, USA."
        icon={Globe2}
      />

      <section>
        <SectionTitle title="Interactive Missions Map" subtitle="Explore our reach and impact in Sierra Leone and Ohio" />
        <p className="text-muted-foreground mb-6 text-center">
          Use the map below to see where our teams are working. Click on markers for more information about specific projects and regions.
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
        <SectionTitle title="Featured Mission Regions" subtitle="Highlights of our key areas of focus in Sierra Leone and Ohio" />
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

