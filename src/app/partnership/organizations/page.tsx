import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Handshake, Users, Mail, ArrowLeft, DollarSign, Gift, Cog } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrganizationPartnershipPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Organizational & Business Partnerships"
        subtitle="Collaborate with EDM to bring hope and transformation to Sierra Leone and foster US-SL connections."
        icon={Briefcase}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-3 md:space-y-4">
          <SectionTitle title="Align Your Organization with Impact" />
          <p className="text-base sm:text-lg text-muted-foreground">
            Align your organization with a cause that brings hope to Sierra Leone and fosters US-SL collaboration. Explore sponsorships and engagement opportunities with EDM to make a tangible difference in evangelism, discipleship, education, and community development.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Partnering with EDM can enhance your corporate social responsibility, engage your employees, and demonstrate your commitment to global impact.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 relative">
          <Image
            src="https://media.istockphoto.com/id/1407285659/photo/multiethnic-young-and-middle-aged-businesspeople-engaged-in-group-meeting.webp?a=1&b=1&s=612x612&w=0&k=20&c=kfzDX6VEwfalzyfpiXpdL5jHbLzTrCUjd3nQiSXE2dg="
            alt="Business professionals collaborating on a global project"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="business meeting collaboration"
          />
        </div>
      </section>
      <SectionTitle title="Ways Your Organization Can Partner" subtitle="Tailored partnerships for meaningful engagement" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Corporate Sponsorship</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Sponsor specific EDM projects in Sierra Leone, such as school programs, ministry initiatives, or community development efforts. Gain visibility and align your brand with a worthy cause.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Employee Engagement</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Facilitate employee volunteering (remote or local), matching gift programs, or workplace giving campaigns to support EDM's mission.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Gift className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">In-Kind Donations & Expertise</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Contribute goods, services, or professional expertise (e.g., logistics, technology, marketing) to support EDM's operations.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Handshake className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Strategic Alliances</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
             Explore long-term strategic alliances to co-develop programs or initiatives that align with both your organization's goals and EDM's mission.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Cog className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Cause Marketing</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
             Partner on cause-related marketing campaigns that raise awareness and funds for EDM's work.
            </p>
          </CardContent>
        </Card>
      </div>
      <section className="text-center bg-card p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Partner Your Organization with EDM" className="text-center" />
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8">
          We are eager to collaborate with organizations and businesses that share our vision for transforming communities in Sierra Leone and supporting our US-based initiatives.
        </p>
        <Link
          href="/contact"
          legacyBehavior>
          <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base">
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Connect with Our Team
          </Button>
        </Link>
      </section>
      <div className="text-center mt-8 md:mt-12">
        <Link href="/get-involved/partner">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm"><ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Back to Partnership Overview</Button>
        </Link>
      </div>
    </div>
  );
}


