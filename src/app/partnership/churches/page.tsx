import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, Globe, Handshake, BookOpenText, Mail, ArrowLeft, Megaphone, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ChurchPartnershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Church Partnerships"
        subtitle="Unite your congregation with EDM to expand outreach efforts in Sierra Leone and with our Ohio partners."
        icon={Building} 
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="The Power of Church Collaboration" />
          <p className="text-lg text-muted-foreground">
            The local church is at the heart of God's plan. EDM seeks to partner with churches in Sierra Leone and Ohio to fulfill the Great Commission together. By combining resources, passion, and people, we can achieve a far greater impact.
          </p>
          <p className="text-lg text-muted-foreground">
            Explore how your church can engage its members in vibrant mission work, supporting efforts in Sierra Leone or collaborating on joint initiatives with our Ohio network.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/churchpartnerSL/600/400"
            alt="Church congregation in Sierra Leone"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="sierra leone church service"
          />
        </div>
      </section>

      <SectionTitle title="Partnership Opportunities for Churches" subtitle="Engage your church in meaningful mission in Sierra Leone & Ohio" />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Support a Sierra Leonean Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Adopt a specific EDM mission project in Sierra Leone or support our Freetown-based missionaries financially and prayerfully. Provide a tangible connection for your congregation.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <UsersRound className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Joint SL-Ohio Outreach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Collaborate on local evangelism events in Sierra Leone or Ohio, or organize short-term mission trips between the two regions with EDM's guidance. Mobilize your members.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Megaphone className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Host an EDM Speaker (SL/OH)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Invite an EDM representative to share inspiring stories from Sierra Leone or discuss Ohio partnerships with your congregation, igniting a passion for focused outreach.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <BookOpenText className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Access & Share Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Utilize EDM's evangelism and discipleship materials contextualized for Sierra Leone or adaptable for Ohio programs. Partner to develop new resources.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Connect Your Church with Our Mission" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We believe strong church partnerships are foundational. Let's discuss how EDM can serve your church in Sierra Leone or Ohio, and how you can join us in impacting these regions for Christ.
        </p>
        <Link href="mailto:churches@edm.org">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Contact Our Church Partnership Team
          </Button>
        </Link>
      </section>

      <div className="text-center mt-12">
        <Link href="/partnership">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Partnership Overview</Button>
        </Link>
      </div>
    </div>
  );
}

