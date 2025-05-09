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
    description: 'Join our mission personally through prayer, volunteering in Sierra Leone or Ohio, advocacy, or financial support. Discover how your unique gifts can make a difference.',
    href: '/partnership/individuals',
    dataAiHint: 'person volunteering sierra leone',
  },
  {
    title: 'For Churches',
    icon: Building, 
    description: 'Partner your congregation with EDM to expand missions in Sierra Leone and engage with our Ohio network. Mobilize members for impactful outreach.',
    href: '/partnership/churches',
    dataAiHint: 'church congregation freetown',
  },
  {
    title: 'For Organizations & Businesses',
    icon: Briefcase,
    description: 'Align your organization with a cause that brings hope to Sierra Leone and fosters US-SL collaboration. Explore sponsorships and engagement.',
    href: '/partnership/organizations',
    dataAiHint: 'business team ohio',
  },
];

export default function PartnershipPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Partner With Us"
        subtitle="Together, we can amplify our impact in Sierra Leone and Ohio through Evangelism, Discipleship, and Missions."
        icon={Handshake}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Why Your Partnership Matters" />
          <p className="text-lg text-muted-foreground">
            At EDM, we believe that collaboration is key to fulfilling the Great Commission in Sierra Leone and extending our reach through vital partnerships in Ohio. Partnerships enable us to expand, deepen our impact, and bring the hope of the Gospel to more communities.
          </p>
          <p className="text-lg text-muted-foreground">
            When you partner with EDM, you become an integral part of a movement dedicated to transforming lives in West Africa and the US. Your support, whether through prayer, resources, or active involvement, fuels our ability to evangelize, disciple, and serve those in need.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/partnershipSLOH/600/400"
            alt="Diverse hands collaborating for Sierra Leone and Ohio"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="collaboration sierra leone ohio"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Explore Partnership Opportunities" subtitle="Find the best fit for you or your organization to impact Sierra Leone & Ohio" className="text-center" />
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
            src="https://picsum.photos/seed/impactsharedSLOH/600/400"
            alt="Community in Sierra Leone benefiting from partnership"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="sierra leone community project"
          />
        </div>
        <div className="space-y-4">
          <SectionTitle title="Shared Vision, Shared Impact" />
          <p className="text-lg text-muted-foreground">
            Partnering with EDM means joining a community committed to integrity and measurable results in Sierra Leone and Ohio. We provide regular updates on how your contributions are making a difference.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <Award className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <span><strong>Tangible Difference:</strong> Witness lives transformed in Sierra Leone and communities uplifted through our collective efforts.</span>
            </li>
            <li className="flex items-start">
              <Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <span><strong>Strategic Collaboration:</strong> Leverage our Sierra Leonean expertise and Ohio network to maximize your missional impact.</span>
            </li>
             <li className="flex items-start">
              <Heart className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <span><strong>Faithful Stewardship:</strong> Rest assured that your resources are managed responsibly to advance God's Kingdom.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center">
        <SectionTitle title="Let's Connect" subtitle="Ready to explore how we can partner for Sierra Leone and Ohio?" className="text-center" />
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

