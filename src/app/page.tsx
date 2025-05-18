
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionTitle from '@/components/shared/section-title';
import { ArrowRight, CalendarDays, Users, BookOpenText, HeartHandshake, MapPin, Newspaper, HelpingHand, Target, Milestone } from 'lucide-react';

const upcomingEvents = [
  { id: 1, title: 'Freetown Evangelism Training', date: 'November 10-12, 2024', location: 'EDM Center, Freetown', image: 'https://placehold.co/400x250.png', dataAiHint: 'training workshop sierra leone' },
  { id: 2, title: 'Oregon Partnership Summit', date: 'December 5, 2024', location: 'Online & Portland, OR', image: 'https://placehold.co/400x250.png', dataAiHint: 'people meeting oregon' },
];

const recentNews = [
  { id: 1, title: 'The Call to Evangelism in Sierra Leone', excerpt: 'Understanding our mandate to share the Good News in every community...', slug: 'the-heart-of-evangelism', image: 'https://placehold.co/400x250.png', dataAiHint: 'sierra leone preaching' },
  { id: 2, title: 'Building Mature Disciples: Our Approach', excerpt: 'How EDM is nurturing new believers to become trainers of others...', slug: 'discipleship-in-the-modern-age', image: 'https://placehold.co/400x250.png', dataAiHint: 'mentoring group teaching' },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-20 md:py-32 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/hero-background.jpg" // Replace with a relevant, high-quality image
            alt="Evangelism and community work in Sierra Leone"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="sierra leone landscape children"
            priority
          />
          <div className="absolute inset-0 bg-background/50"></div> {/* Slightly stronger overlay */}
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Welcome to <span className="text-primary">EDM</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Evangelism, Discipleship, Missions: Spreading hope, building faith, and transforming lives in Sierra Leone, West Africa, with vital partnerships in Oregon, USA.
          </p>
          <div className="flex flex-nowrap justify-center space-x-2 sm:space-x-4">
            <Link href="/about">
              <Button size="sm" variant="default" className="whitespace-nowrap text-xs sm:text-sm">
                Our Story <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="sm" variant="outline" className="whitespace-nowrap text-xs sm:text-sm">
                Support EDM <HelpingHand className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section>
        <SectionTitle title="Our Three Pillars" subtitle="The foundation of EDM's ministry" />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Evangelism', description: 'Actively sharing the good news of Jesus Christ with unbelievers throughout Sierra Leone, compelled by Romans 10:13-15.', icon: BookOpenText, href: "/ministries/evangelism" },
            { title: 'Discipleship', description: 'Training believers to maturity in faith, equipping them to disciple others as commanded in Matthew 28:18-20.', icon: Users, href: "/ministries/discipleship" },
            { title: 'Missions', description: 'Reaching out with compassion and practical service, fulfilling God\'s call through tangible actions and local/rural outreach.', icon: HeartHandshake, href: "/ministries/missions-outreach" },
          ].map((pillar) => (
            <Card key={pillar.title} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <pillar.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{pillar.description}</p>
              </CardContent>
              <CardContent className="pt-4">
                 <Link href={pillar.href}>
                    <Button variant="link" className="text-sm">Learn More <ArrowRight className="ml-1 h-3 w-3"/></Button>
                 </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Mission Statement & Motto Section */}
      <section className="bg-primary/5 p-8 md:p-12 rounded-lg shadow-lg">
        <div className="text-center max-w-3xl mx-auto">
            <SectionTitle title="Our Guiding Words" className="text-center"/>
             <div className="mb-8">
                <h3 className="text-2xl font-semibold text-primary mb-2">Mission Statement</h3>
                <blockquote className="text-xl italic text-foreground border-l-4 border-primary pl-4 py-2">
                "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
                </blockquote>
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">Motto</h3>
                <p className="text-xl italic text-foreground">
                "Love God and love others."
                </p>
            </div>
        </div>
      </section>


      {/* Vision Section */}
      <section>
        <SectionTitle title="Our Vision for EDM" subtitle="Building a legacy of faith and service" />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Campus for Christ in Sierra Leone</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our long-term vision includes building a dedicated campus for the body of Christ in Sierra Leone. This hub will feature a retreat center, school, lodging, recreation facilities, a chapel, and more, serving as a beacon for growth, training, and outreach.
              </p>
              <Image src="https://placehold.co/600x350.png" alt="EDM Campus Vision" width={600} height={350} className="rounded-md shadow-md" data-ai-hint="architectural rendering school campus africa" />
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Milestone className="h-7 w-7 text-primary" />
                  <CardTitle className="text-xl">Key Goals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <h4 className="font-semibold text-foreground mb-1">Short-Term:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-3">
                  <li>Get the van and equipment through customs.</li>
                  <li>Finalize land acquisition for the campus.</li>
                  <li>Establish international board members.</li>
                  <li>Begin construction of the school.</li>
                  <li>Conduct evangelism training sessions.</li>
                  <li>Utilize the "Jesus" movie for evangelism.</li>
                </ul>
                <h4 className="font-semibold text-foreground mb-1">Long-Term:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Build all planned facilities on the EDM campus.</li>
                  <li>Extend the mission to other cities in Sierra Leone.</li>
                  <li>Establish key operational departments.</li>
                </ul>
              </CardContent>
            </Card>
             <Link href="/the-mission" className="block">
                <Button variant="default" className="w-full md:w-auto">
                Learn More About Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Recent News & Updates Preview */}
      <section>
        <SectionTitle title="News & Updates" subtitle="Latest from EDM" />
        <div className="grid md:grid-cols-2 gap-8">
          {recentNews.map(post => (
            <Card key={post.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Link href={`/news/${post.slug}`} className="block">
                <Image src={post.image} alt={post.title} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={post.dataAiHint} />
              </Link>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors"><Link href={`/news/${post.slug}`}>{post.title}</Link></h3>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                <Link href={`/news/${post.slug}`}>
                  <Button variant="outline" className="w-full">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/news">
            <Button variant="default">
              All News & Updates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action - Donate / Get Involved */}
      <section className="bg-card py-16 rounded-lg shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="Partner With EDM" subtitle="Your support makes a difference in Sierra Leone & Oregon" className="text-center" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join us in our mission to spread the Gospel and make a lasting impact. Whether through prayer, giving, or volunteering, your contribution is invaluable.
          </p>
          <div className="flex flex-nowrap justify-center space-x-2 sm:space-x-4">
            <Link href="/donate">
              <Button size="sm" variant="default" className="whitespace-nowrap text-xs sm:text-sm">
                Donate Now <HelpingHand className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link href="/get-involved"> 
              <Button size="sm" variant="outline" className="whitespace-nowrap text-xs sm:text-sm">
                Get Involved <Users className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
