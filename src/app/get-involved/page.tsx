
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, HeartHandshake, Handshake as PartnerIcon, Film, ArrowRight, Briefcase, Building } from 'lucide-react'; // Renamed Handshake to PartnerIcon
import Link from 'next/link';
import Image from 'next/image';

const involvementOpportunities = [
  {
    title: 'Volunteer Your Time & Skills',
    icon: Users,
    description: 'Offer your talents to support EDM\'s work in Sierra Leone or assist our Ohio-based partners with administrative, technical, or outreach tasks.',
    link: '/get-involved/volunteer',
    dataAiHint: "volunteers group diverse hands",
  },
  {
    title: 'Become a Prayer Partner',
    icon: HeartHandshake,
    description: 'Commit to praying regularly for our missionaries, projects, the communities we serve in Sierra Leone, and our partnerships in Ohio.',
    link: '/get-involved/prayer',
    dataAiHint: "people praying together circle",
  },
  {
    title: 'Partnership Opportunities',
    icon: PartnerIcon, // Using the aliased icon
    description: 'Explore how your church, organization, or business can formally partner with EDM to amplify our impact in Sierra Leone and Ohio.',
    link: '/get-involved/partner',
    dataAiHint: "handshake agreement global",
  },
  {
    title: 'Host a Movie Screening or Event',
    icon: Film,
    description: 'Organize a showing of the "Jesus" film or an EDM awareness event in your community to share our mission and gather support.',
    link: '/contact', // Link to contact page for now
    dataAiHint: "movie screening community event",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Get Involved with EDM"
        subtitle="Join us in making a difference in Sierra Leone and Ohio through Evangelism, Discipleship, and Missions."
        icon={Users}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Your Part in God's Work" />
          <p className="text-lg text-muted-foreground">
            EDM thrives on the commitment and passion of individuals, churches, and organizations like yours. There are many ways to contribute your unique gifts and resources to support our vital work in Sierra Leone and our collaborative efforts with partners in Ohio.
          </p>
          <p className="text-lg text-muted-foreground">
            Whether you can offer your time, prayers, financial support, or your network, every contribution helps us spread the Gospel, disciple believers, and serve communities in need.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Diverse group of people working together on a mission project"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="teamwork collaboration mission"
          />
        </div>
      </section>

      <SectionTitle title="Ways to Engage with EDM" subtitle="Find how you can best contribute" className="text-center"/>
      <div className="grid md:grid-cols-2 gap-8">
        {involvementOpportunities.map((opportunity) => (
          <Card key={opportunity.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
             <div className="relative w-full h-52">
                <Image src={`https://placehold.co/500x300.png?text=${opportunity.title.replace(/\s/g, '+')}`} alt={opportunity.title} layout="fill" objectFit="cover" data-ai-hint={opportunity.dataAiHint} />
             </div>
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 w-fit">
                <opportunity.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{opportunity.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <p className="text-muted-foreground text-sm mb-4">{opportunity.description}</p>
            </CardContent>
            <CardContent className="pt-2 pb-4 text-center">
              <Link href={opportunity.link}>
                <Button variant="outline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Ready to Take the Next Step?" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Your involvement is crucial to our success in Sierra Leone and Ohio. If you're inspired to join us or have questions, please don't hesitate to reach out.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/contact">
                <Button size="lg">Contact Us</Button>
            </Link>
            <Link href="/donate">
                <Button size="lg" variant="default">Donate to Support EDM</Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
