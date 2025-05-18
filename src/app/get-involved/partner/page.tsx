
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Users, Building, Briefcase as BriefcaseIcon, Mail, ArrowRight } from 'lucide-react'; // Renamed Briefcase
import Image from 'next/image';
import Link from 'next/link';

const partnershipTypes = [
  {
    title: 'For Individuals',
    icon: Users,
    description: 'Join our mission personally through prayer, volunteering in Sierra Leone or Oregon, advocacy, or financial support. Discover how your unique gifts can make a difference.',
    href: '/partnership/individuals',
    imageUrl: 'https://media.istockphoto.com/id/2099408907/photo/smiling-young-businessman-standing-with-his-arms-crossed-against-an-office-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=N0rshqVGbuvJ6zFWKLzkwbulYEqqx1mtWzu_eSSOQXE=',
    dataAiHint: 'individual professional volunteering',
  },
  {
    title: 'For Churches',
    icon: Building, 
    description: 'Partner your congregation with EDM to expand missions in Sierra Leone and engage with our Oregon network. Mobilize members for impactful outreach.',
    href: '/partnership/churches',
    imageUrl: 'https://images.unsplash.com/photo-1560253226-26f367c49ae2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhJTIwY2h1cmNofGVufDB8fDB8fHww',
    dataAiHint: 'church congregation africa',
  },
  {
    title: 'For Organizations & Businesses',
    icon: BriefcaseIcon, // Using renamed icon
    description: 'Align your organization with a cause that brings hope to Sierra Leone and fosters US-SL collaboration. Explore sponsorships and engagement.',
    href: '/partnership/organizations',
    imageUrl: 'https://media.istockphoto.com/id/2161896355/photo/two-businessmen-collaborating-in-office-with-laptop.webp?a=1&b=1&s=612x612&w=0&k=20&c=mosmbYinW92mgeSo7qD1iZvTYPzUCofx7mDNhBIYqzA=',
    dataAiHint: 'business team collaboration',
  },
];

export default function PartnerPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Partner With EDM"
        subtitle="Together, we can amplify our impact in Sierra Leone and Oregon through Evangelism, Discipleship, and Missions."
        icon={Handshake}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Why Your Partnership Matters" />
          <p className="text-lg text-muted-foreground">
            At EDM, we believe that collaboration is key to fulfilling the Great Commission in Sierra Leone and extending our reach through vital partnerships in Oregon. Partnerships enable us to expand, deepen our impact, and bring the hope of the Gospel to more communities.
          </p>
          <p className="text-lg text-muted-foreground">
            When you partner with EDM, you become an integral part of a movement dedicated to transforming lives in West Africa and the US. Your support, whether through prayer, resources, or active involvement, fuels our ability to evangelize, disciple, and serve those in need.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://media.istockphoto.com/id/96653688/photo/handshake.webp?a=1&b=1&s=612x612&w=0&k=20&c=2o15a4X4zTScv56ipJaem6iV5jcNqnu-n3IRm8Eys-o="
            alt="Diverse hands collaborating for Sierra Leone and Oregon"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="collaboration handshake partnership"
          />
        </div>
      </section>

      <SectionTitle title="Explore Partnership Opportunities" subtitle="Find the best fit for you or your organization to impact Sierra Leone & Oregon" className="text-center" />
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {partnershipTypes.map((opportunity) => (
          <Card key={opportunity.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
             <div className="relative w-full h-56">
                <Image src={opportunity.imageUrl} alt={opportunity.title} layout="fill" objectFit="cover" data-ai-hint={opportunity.dataAiHint} />
             </div>
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 w-fit">
                <opportunity.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <p className="text-muted-foreground text-sm mb-4">{opportunity.description}</p>
            </CardContent>
            <CardContent className="pt-4 pb-6 text-center"> 
              <Link href={opportunity.href}>
                <Button className="w-full sm:w-auto" variant="outline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Let's Connect" subtitle="Ready to explore how we can partner for Sierra Leone and Oregon?" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We are excited to discuss how your unique gifts, resources, or organizational goals can align with EDM's mission. Reach out to our partnership team to start a conversation.
        </p>
        <Link href="mailto:partnerships@edm.org?subject=Partnership%20Inquiry">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Contact Our Partnership Team
          </Button>
        </Link>
      </section>
    </div>
  );
}

