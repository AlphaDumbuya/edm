
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, HeartHandshake, Handshake as PartnerIcon, Film, ArrowRight, Briefcase, Building, Mail } from 'lucide-react'; // Added Mail
import Link from 'next/link';
import Image from 'next/image';

const involvementOpportunities = [
  {
    title: 'Volunteer Your Time & Skills',
    icon: Users,
    description: 'Offer your talents to support EDM\'s work in Sierra Leone or assist our Oregon-based partners with administrative, technical, or outreach tasks.',
    link: '/get-involved/volunteer',
    imageUrl: 'https://source.unsplash.com/random/500x300/?volunteers,group,diverse,hands',
    dataAiHint: "volunteers group diverse hands",
  },
  {
    title: 'Become a Prayer Partner',
    icon: HeartHandshake,
    description: 'Commit to praying regularly for our missionaries, projects, the communities we serve in Sierra Leone, and our partnerships in Oregon.',
    link: '/get-involved/prayer',
    imageUrl: 'https://source.unsplash.com/random/500x300/?people,praying,together,circle',
    dataAiHint: "people praying together circle",
  },
  {
    title: 'Partnership Opportunities',
    icon: PartnerIcon, 
    description: 'Explore how your church, organization, or business can formally partner with EDM to amplify our impact in Sierra Leone and Oregon.',
    link: '/get-involved/partner',
    imageUrl: 'https://media.istockphoto.com/id/96653688/photo/handshake.webp?a=1&b=1&s=612x612&w=0&k=20&c=2o15a4X4zTScv56ipJaem6iV5jcNqnu-n3IRm8Eys-o=',
    dataAiHint: "handshake agreement global",
  },
  {
    title: 'Host a Movie Screening or Event',
    icon: Film,
    description: 'Organize a showing of the "Jesus" film or an EDM awareness event in your community to share our mission and gather support.',
    link: '/contact', 
    imageUrl: 'https://source.unsplash.com/random/500x300/?movie,screening,community,event',
    dataAiHint: "movie screening community event",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Get Involved with EDM"
        subtitle="Join us in making a difference in Sierra Leone and Oregon through Evangelism, Discipleship, and Missions."
        icon={Users}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-3 md:space-y-4">
          <SectionTitle title="Your Part in God's Work" />
          <p className="text-base sm:text-lg text-muted-foreground">
            EDM thrives on the commitment and passion of individuals, churches, and organizations like yours. There are many ways to contribute your unique gifts and resources to support our vital work in Sierra Leone and our collaborative efforts with partners in Oregon.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Whether you can offer your time, prayers, financial support, or your network, every contribution helps us spread the Gospel, disciple believers, and serve communities in need.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80">
          <Image
            src="https://source.unsplash.com/random/600x400/?teamwork,collaboration,mission,africa"
            alt="Diverse group of people working together on a mission project"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="teamwork collaboration mission"
          />
        </div>
      </section>
      <SectionTitle title="Ways to Engage with EDM" subtitle="Find how you can best contribute" className="text-center"/>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {involvementOpportunities.map((opportunity) => (
          <Card key={opportunity.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
             <div className="relative w-full h-48 sm:h-56">
                <Image 
                    src={opportunity.imageUrl} 
                    alt={opportunity.title} 
                    layout="fill" 
                    objectFit="cover" 
                    data-ai-hint={opportunity.dataAiHint}
                    className="rounded-t-lg"
                 />
             </div>
            <CardHeader className="items-center text-center p-4">
              <div className="p-3 bg-primary/10 rounded-full mb-2 sm:mb-3 w-fit">
                <opportunity.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl">{opportunity.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center p-4 pt-0">
              <p className="text-muted-foreground text-xs sm:text-sm mb-4">{opportunity.description}</p>
            </CardContent>
            <CardContent className="pt-2 sm:pt-4 pb-4 sm:pb-6 text-center border-t">
              <Link href={opportunity.link} legacyBehavior>
                <Button className="w-full sm:w-auto text-xs sm:text-sm" variant="outline">
                  Learn More <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <section className="text-center bg-card p-6 md:p-8 lg:p-12 rounded-lg shadow-lg mt-8 sm:mt-12">
        <SectionTitle title="Ready to Take the Next Step?" className="text-center" />
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8">
          Your involvement is crucial to our success in Sierra Leone and Oregon. If you're inspired to join us or have questions, please don't hesitate to reach out.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/contact" legacyBehavior>
                <Button size="lg" className="text-sm sm:text-base">
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contact Us
                </Button>
            </Link>
            <Link href="/donate" legacyBehavior>
                <Button size="lg" variant="default" className="text-sm sm:text-base">Donate to Support EDM</Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
