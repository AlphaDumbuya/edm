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
        subtitle="Unite your congregation with EDM to expand global and local outreach efforts."
        icon={Building} // Using Users icon to represent a congregation/community
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="The Power of Church Collaboration" />
          <p className="text-lg text-muted-foreground">
            The local church is at the heart of God's plan for reaching the world. EDM seeks to partner with churches like yours to fulfill the Great Commission together. By combining resources, passion, and people, we can achieve a far greater impact than we could alone.
          </p>
          <p className="text-lg text-muted-foreground">
            Explore how your church can engage its members in vibrant mission work, both locally and globally, through a strategic partnership with EDM.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/churchpartner/600/400"
            alt="Church congregation"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="church worship service"
          />
        </div>
      </section>

      <SectionTitle title="Partnership Opportunities for Churches" subtitle="Engage your church in meaningful mission" />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Support a Mission Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Adopt a specific EDM mission project or support our missionaries financially and prayerfully. This provides a tangible connection for your congregation to global missions.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <UsersRound className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Joint Outreach Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Collaborate on local evangelism events or organize short-term mission trips with EDM's guidance and support. Mobilize your members for hands-on ministry.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Megaphone className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Host an EDM Speaker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Invite an EDM representative to share inspiring stories and mission updates with your congregation, igniting a passion for global and local outreach.
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
              Utilize EDM's evangelism and discipleship materials for your church programs. Partner with us to develop and distribute new resources for a wider reach.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Connect Your Church with Our Mission" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We believe that strong church partnerships are foundational to effective ministry. Let's discuss how EDM can serve your church and how your church can join us in impacting the world for Christ.
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
