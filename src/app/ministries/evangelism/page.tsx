
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, Volume2, Users, Newspaper, Radio } from 'lucide-react';
import Image from 'next/image';

export default function EvangelismPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Evangelism Ministries"
        subtitle="Proclaiming the Good News of Jesus Christ across Sierra Leone."
        icon={Volume2}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Our Evangelistic Mandate" />
          <p className="text-lg text-muted-foreground mb-4">
            At EDM, evangelism is the heartbeat of our mission. We are driven by the conviction that every person deserves to hear the life-changing message of Jesus Christ. Our efforts are guided by Romans 10:14-15: "How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?" We are sent to preach.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://plus.unsplash.com/premium_photo-1723759212099-d33000267d6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGlzY2lwbGVzaGlwfGVufDB8fDB8fHww"
            alt="EDM evangelism team sharing the Gospel"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone evangelism outreach"
          />
        </div>
      </section>

      <SectionTitle title="Our Evangelism Strategies" subtitle="Diverse approaches to reach diverse communities in Sierra Leone" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">"Jesus" Film Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Utilizing the powerful "Jesus" film to present the Gospel in local languages, reaching communities in towns and remote villages across Sierra Leone.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Street & Community Outreach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Directly engaging with individuals and groups in public spaces, markets, and neighborhoods, sharing personal testimonies and the message of hope.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Radio className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Music & Media Evangelism</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Leveraging the power of music, radio broadcasts, and digital media to spread the Gospel message widely and creatively to all age groups in Sierra Leone.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Literature & Resource Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Providing Bibles, tracts, and other Christian literature to new believers and seekers, supporting their journey of faith and understanding.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
