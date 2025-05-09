import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Users, Building, Briefcase, Mail, ArrowRight, Award, Lightbulb, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const partnershipTypes = [
  {
    title: 'For Individuals',
    icon: Users,
    description: 'Join our mission personally through prayer, volunteering, advocacy, or financial support. Discover how your unique gifts can make a difference.',
    href: '/partnership/individuals',
    dataAiHint: 'person volunteering community',
  },
  {
    title: 'For Churches',
    icon: Building, // Using Building as a generic representation for a church or institution
    description: 'Partner your congregation with EDM to expand your missions footprint and engage your members in meaningful global and local outreach.',
    href: '/partnership/churches',
    dataAiHint: 'church congregation worship',
  },
  {
    title: 'For Organizations & Businesses',
    icon: Briefcase,
    description: 'Align your organization with a cause that brings hope and transformation. Explore corporate sponsorships, in-kind donations, and employee engagement.',
    href: '/partnership/organizations',
    dataAiHint: 'business team meeting',
  },
];

export default function PartnershipPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Partner With Us"
        subtitle="Together, we can amplify our impact and bring lasting change through Evangelism, Discipleship, and Missions."
        icon={Handshake}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Why Your Partnership Matters" />
          <p className="text-lg text-muted-foreground">
            At EDM, we believe that collaboration is key to fulfilling the Great Commission. Partnerships enable us to expand our reach, deepen our impact, and bring the hope of the Gospel to more communities around the world.
          </p>
          <p className="text-lg text-muted-foreground">
            When you partner with EDM, you become an integral part of a global movement dedicated to transforming lives. Your support, whether through prayer, resources, or active involvement, fuels our ability to evangelize, disciple, and serve those in need.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/partnershipmain/600/400"
            alt="Diverse hands collaborating"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="collaboration diverse hands"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Explore Partnership Opportunities" subtitle="Find the best fit for you or your organization" className="text-center" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnershipTypes.map((opportunity) => (
            <Card key={opportunity.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3 w-fit">
                  <opportunity.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm mb-4">{opportunity.description}</p>
              </CardContent>
              <CardContent className="pt-4"> 
                <Link href={opportunity.href}>
                  <Button className="w-full" variant="outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="grid md:grid-cols-2 gap-12 items-center bg-card p-8 md:p-12 rounded-lg shadow-lg">
         <div className="rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://picsum.photos/seed/impactshared2/600/400"
            alt="Community benefiting from partnership"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="community project impact"
          />
        </div>
        <div className="space-y-4">
          <SectionTitle title="Shared Vision, Shared Impact" />
          <p className="text-lg text-muted-foreground">
            Partnering with EDM means joining a community committed to integrity, stewardship, and measurable results. We provide regular updates on how your contributions are making a difference and offer opportunities to connect more deeply with our work.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <Award className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <span><strong>Tangible Difference:</strong> Witness lives transformed and communities uplifted through our collective efforts.</span>
            </li>
            <li className="flex items-start">
              <Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <span><strong>Strategic Collaboration:</strong> Leverage our expertise and global network to maximize your missional impact.</span>
            </li>
             <li className="flex items-start">
              <Heart className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <span><strong>Faithful Stewardship:</strong> Rest assured that your resources are managed responsibly to advance God's Kingdom.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center">
        <SectionTitle title="Let's Connect" subtitle="Ready to explore how we can partner together?" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We are excited to discuss how your unique gifts, resources, or organizational goals can align with EDM's mission. Reach out to our partnership team to start a conversation.
        </p>
        <Link href="mailto:partnerships@edm.org">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Contact Our Partnership Team
          </Button>
        </Link>
      </section>
    </div>
  );
}
