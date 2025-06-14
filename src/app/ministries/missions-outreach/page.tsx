
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Globe, Tent, Users2 } from 'lucide-react';
import Image from 'next/image';

export default function MissionsOutreachPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Missions & Outreach"
        subtitle="Extending the Kingdom through church planting and community service in Sierra Leone."
        icon={Globe}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Our Call to Missions" />
          <p className="text-lg text-muted-foreground mb-4">
            EDM is passionately committed to missions, both locally and in unreached areas of Sierra Leone. We believe in demonstrating God's love through tangible acts of service and by establishing vibrant, Christ-centered communities of faith. Our outreach efforts aim to meet both spiritual and physical needs.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://images.unsplash.com/photo-1747557989375-efa97adba7b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwywfHx8ZW58MHx8fHx8A%3D%3D"
            alt="EDM mission team serving a community in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="church planting africa community"
          />
        </div>
      </section>

      <SectionTitle title="Key Mission & Outreach Activities" subtitle="Building communities and transforming lives" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Tent className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Church Planting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Establishing new churches in unreached areas of Sierra Leone, equipping local leaders to pastor and grow these new congregations.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Local & Rural Outreach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Conducting targeted outreach programs in both urban and remote rural communities, providing aid, sharing the Gospel, and connecting people to local believers.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Handshake className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Partnerships with Local Churches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Collaborating with existing local churches in Sierra Leone to strengthen their outreach capabilities, provide resources, and engage in joint mission projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
