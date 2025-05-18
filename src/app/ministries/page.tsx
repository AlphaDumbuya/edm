
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpenText, Users, HeartHandshake, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ministryAreas = [
  {
    title: 'Evangelism',
    icon: BookOpenText,
    description: 'Actively sharing the Gospel through street outreach, the "Jesus" film project, music, and media to reach every corner of Sierra Leone.',
    link: '/ministries/evangelism',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sierra leone evangelism street',
  },
  {
    title: 'Discipleship',
    icon: Users,
    description: 'Nurturing believers to spiritual maturity with structured training paths, curriculum, and mentorship programs, equipping them to train others.',
    link: '/ministries/discipleship',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bible study group africa',
  },
  {
    title: 'Missions Outreach',
    icon: HeartHandshake,
    description: 'Engaging in church planting, local and rural community outreach, and partnering with local churches to extend God\'s kingdom tangibly.',
    link: '/ministries/missions-outreach',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'community service africa church',
  },
  {
    title: 'Education',
    icon: GraduationCap,
    description: 'Developing our school construction project, planning for a future Bible school, and focusing on Christian curriculum and teacher training.',
    link: '/ministries/education',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'school children africa classroom',
  },
];

export default function MinistriesPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Ministries"
        subtitle="Exploring the diverse ways EDM serves through Evangelism, Discipleship, Missions, and Education."
        icon={HeartHandshake}
      />
      <SectionTitle title="Core Ministry Areas" subtitle="Fulfilling the Great Commission in Sierra Leone & Ohio" />
      <div className="grid md:grid-cols-2 gap-8">
        {ministryAreas.map((area) => (
          <Card key={area.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-56">
              <Image src={area.imageUrl} alt={area.title} layout="fill" objectFit="cover" data-ai-hint={area.dataAiHint} />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <area.icon className="h-7 w-7 mr-3" />
                {area.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{area.description}</p>
            </CardContent>
            <CardContent className="border-t pt-4">
              <Link href={area.link}>
                <Button className="w-full" variant="outline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
