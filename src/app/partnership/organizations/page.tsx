
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Handshake, Users, Mail, ArrowLeft, DollarSign, Gift, Cog } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrganizationPartnershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Organizational & Business Partnerships"
        subtitle="Collaborate with EDM to bring hope and transformation to Sierra Leone and foster US-SL connections."
        icon={Briefcase}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Align Your Organization with Impact" />
          <p className="text-lg text-muted-foreground">
            Align your organization with a cause that brings hope to Sierra Leone and fosters US-SL collaboration. Explore sponsorships and engagement opportunities with EDM to make a tangible difference in evangelism, discipleship, education, and community development.
          </p>
          <p className="text-lg text-muted-foreground">
            Partnering with EDM can enhance your corporate social responsibility, engage your employees, and demonstrate your commitment to global impact.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://source.unsplash.com/random/600x400/?business,collaboration,global"
            alt="Business professionals collaborating on a global project"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="business team global"
          />
        </div>
      </section>

      <SectionTitle title="Ways Your Organization Can Partner" subtitle="Tailored partnerships for meaningful engagement in Sierra Leone & Oregon" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Corporate Sponsorship</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Sponsor specific EDM projects in Sierra Leone, such as school programs, ministry initiatives, or community development efforts. Gain visibility and align your brand with a worthy cause.
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
              Facilitate employee volunteering opportunities (remote or in Sierra Leone/Oregon), matching gift programs, or workplace giving campaigns to support EDM's mission.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">In-Kind Donations & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Contribute goods, services, or professional expertise (e.g., logistics, technology, marketing) to support EDM's operations in Sierra Leone or Oregon.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Handshake className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Strategic Alliances</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
             Explore long-term strategic alliances to co-develop programs or initiatives that align with both your organization's goals and EDM's mission.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Cog className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Cause Marketing Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
             Partner on cause-related marketing campaigns that raise awareness and funds for EDM's work in Sierra Leone and Oregon.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Partner Your Organization with EDM" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We are eager to collaborate with organizations and businesses that share our vision for transforming communities in Sierra Leone and supporting our US-based initiatives.
        </p>
        <Link href="mailto:orgpartnerships@edm.org?subject=Organizational/Business%20Partnership%20Inquiry">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Connect with Our Partnership Team
          </Button>
        </Link>
      </section>

      <div className="text-center mt-12">
        <Link href="/get-involved/partner">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Partnership Overview</Button>
        </Link>
      </div>
    </div>
  );
}
