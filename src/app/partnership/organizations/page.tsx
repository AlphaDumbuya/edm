import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building2, Zap, Users, Heart, Mail, ArrowLeft, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrganizationPartnershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Organizational & Business Partnerships"
        subtitle="Align your organization's values with a mission that brings hope and transformation."
        icon={Briefcase}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Strategic Alliances for Greater Impact" />
          <p className="text-lg text-muted-foreground">
            Businesses and organizations possess unique resources, expertise, and networks that can significantly amplify missional impact. EDM offers tailored partnership opportunities that align with your corporate social responsibility goals, enhance brand reputation, and engage employees in meaningful ways.
          </p>
          <p className="text-lg text-muted-foreground">
            Partner with us to create a lasting legacy of positive change, demonstrating your commitment to values that resonate with customers, employees, and stakeholders.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/orgpartner/600/400"
            alt="Business people collaborating"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="business meeting collaboration"
          />
        </div>
      </section>

      <SectionTitle title="Partnership Opportunities for Organizations" subtitle="Leverage your strengths for a global cause" />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Corporate Sponsorships</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Sponsor key EDM events, specific mission programs, or regional initiatives. Gain visibility and demonstrate your commitment to social impact. We offer various sponsorship levels with corresponding recognition benefits.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">In-Kind Donations & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Contribute valuable goods (e.g., technology, supplies) or professional services (e.g., legal, marketing, logistics) that can support our operations and reduce overhead costs, allowing more funds to go directly to mission work.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Employee Engagement Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Foster a culture of giving within your organization. Implement employee giving campaigns, matching gift programs, or organize corporate volunteer days to support EDM projects.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Cause Marketing Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Collaborate on co-branded marketing campaigns where a portion of sales or proceeds supports EDM's mission. This can enhance customer loyalty and drive positive brand association.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Partner with Purpose" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          EDM is committed to building mutually beneficial partnerships with organizations and businesses that share our vision for a transformed world. Let's explore how we can create a customized partnership that aligns with your strategic objectives and our missional goals.
        </p>
        <Link href="mailto:corporate@edm.org">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Contact Our Corporate Relations Team
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
