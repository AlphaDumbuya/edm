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
        subtitle="Align your organization with a mission bringing hope to Sierra Leone & fostering US-SL ties via Ohio."
        icon={Briefcase}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Strategic Alliances for Sierra Leone & Ohio" />
          <p className="text-lg text-muted-foreground">
            Businesses and organizations possess resources that can significantly amplify our impact in Sierra Leone and through our Ohio partnerships. EDM offers tailored opportunities aligning with your CSR goals and engaging employees.
          </p>
          <p className="text-lg text-muted-foreground">
            Partner with us to create a lasting legacy of positive change in these regions, demonstrating your commitment to impactful values.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/orgpartnerSLOH/600/400"
            alt="Business people collaborating for Sierra Leone/Ohio"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="business meeting sierra leone ohio"
          />
        </div>
      </section>

      <SectionTitle title="Partnership Opportunities for Organizations" subtitle="Leverage your strengths for Sierra Leone & Ohio" />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Corporate Sponsorships (SL/OH)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Sponsor EDM events in Freetown or Ohio, specific mission programs in Sierra Leone, or regional initiatives. Gain visibility and demonstrate social impact.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">In-Kind Donations (SL focused)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Contribute goods (e.g., technology, supplies for Sierra Leone) or professional services (e.g., marketing, logistics for SL/OH operations) to support our work.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Employee Engagement (SL/OH)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Foster giving within your organization. Implement employee giving for Sierra Leone projects, matching gifts, or volunteer days supporting SL/OH efforts.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Cause Marketing (SL/OH Impact)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Collaborate on co-branded campaigns where proceeds support EDM's mission in Sierra Leone or our Ohio partnership work. Enhance customer loyalty.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Partner with Purpose for Sierra Leone & Ohio" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          EDM is committed to building mutually beneficial partnerships. Let's explore a customized partnership aligning with your objectives and our missional goals for Sierra Leone and Ohio.
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

