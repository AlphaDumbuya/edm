import PageHeader from '@/components/shared/page-header';
import MissionsMapClient from '@/components/missions/missions-map-client';
import { Globe2 } from 'lucide-react';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const missionRegions = [
  {
    name: 'East Africa Project',
    description: 'Focused on community development, church planting, and leadership training in Kenya, Uganda, and Tanzania.',
    imageUrl: 'https://picsum.photos/seed/eastafrica/400/250',
    dataAiHint: 'african village people',
    focusAreas: ['Water Wells', 'Education', 'Healthcare Clinics'],
    countryFlags: ['🇰🇪', '🇺🇬', '🇹🇿']
  },
  {
    name: 'Southeast Asia Initiative',
    description: 'Supporting local evangelists and providing resources for unreached people groups in remote areas.',
    imageUrl: 'https://picsum.photos/seed/seasia/400/250',
    dataAiHint: 'asian landscape mountains',
    focusAreas: ['Literature Distribution', 'Digital Evangelism', 'Youth Ministry'],
    countryFlags: ['🇹🇭', '🇻🇳', '🇲🇲']
  },
  {
    name: 'Latin America Outreach',
    description: 'Partnering with local churches for urban evangelism, discipleship programs, and social justice initiatives.',
    imageUrl: 'https://picsum.photos/seed/latam/400/250',
    dataAiHint: 'latin american city',
    focusAreas: ['Urban Ministry', 'Children\'s Programs', 'Anti-trafficking'],
    countryFlags: ['🇧🇷', '🇨🇴', '🇵🇪']
  },
];

export default function MissionsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Global Missions"
        subtitle="Showcasing the countries and regions where EDM Connect is actively involved."
        icon={Globe2}
      />

      <section>
        <SectionTitle title="Interactive Missions Map" subtitle="Explore our reach and impact across the globe" />
        <p className="text-muted-foreground mb-6 text-center">
          Use the map below to see where our teams are working. Click on markers for more information about specific projects and regions.
          (Note: Map functionality requires a Google Maps API key to be configured.)
        </p>
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <MissionsMapClient />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionTitle title="Featured Mission Regions" subtitle="Highlights of our key areas of focus" />
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
