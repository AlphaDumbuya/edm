
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import SectionTitle from '@/components/shared/section-title';
import { ArrowRight, Users, BookOpenText, HeartHandshake, Newspaper, HelpingHand, Target, Milestone, School } from 'lucide-react';

const recentNews = [
  { id: 1, title: 'EDM Marifa School: Now Operating!', excerpt: 'Exciting updates from our operational secondary school in Marifa, shaping young lives...', slug: '/news/edm-campus-vision-update', image: 'https://code-alpha-image-gallary.vercel.app/edm-marifa1.JPG', dataAiHint: 'school children marifa' },
  { id: 2, title: 'Urgent: Customs Fee for Ministry Van', excerpt: 'We need your help to clear our vital ministry van and equipment from customs in Freetown...', slug: '/news/customs-fee-urgent-need', image: 'https://source.unsplash.com/random/400x250/?donation,support', dataAiHint: 'donation support hands' },
];

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-16 md:py-24 lg:py-32 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1572061486195-d811e12d0a10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNocmlzdGlhbml0eXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Evangelism and community work in Sierra Leone"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="christianity community children"
            priority
          />
          <div className="absolute inset-0 bg-background/50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 md:mb-6">
            Welcome to <span className="text-primary">EDM</span>
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-muted-foreground max-w-xl md:max-w-3xl mx-auto mb-6 md:mb-8">
            Evangelism, Discipleship, Missions: Spreading hope, building faith, and transforming lives in Sierra Leone, West Africa, with vital partnerships in Oregon, USA.
          </p>
          <div className="flex flex-nowrap justify-center items-center space-x-2 sm:space-x-3">
            <Link href="/about">
              <Button size="sm" variant="default" className="whitespace-nowrap text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
                Our Story <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="sm" variant="outline" className="whitespace-nowrap text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
                Support EDM <HelpingHand className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section>
        <SectionTitle title="Our Three Pillars" subtitle="The foundation of EDM's ministry" />
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: 'Evangelism', description: 'Actively sharing the good news of Jesus Christ with unbelievers throughout Sierra Leone, compelled by Romans 10:13-15.', icon: BookOpenText, href: "/ministries/evangelism" },
            { title: 'Discipleship', description: 'Training believers to maturity in faith, equipping them to disciple others as commanded in Matthew 28:18-20.', icon: Users, href: "/ministries/discipleship" },
            { title: 'Missions', description: 'Reaching out with compassion and practical service, fulfilling God\'s call through tangible actions and local/rural outreach.', icon: HeartHandshake, href: "/ministries/missions-outreach" },
          ].map((pillar) => (
            <Card key={pillar.title} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-4 sm:p-6">
                <div className="mx-auto bg-primary/10 p-3 sm:p-4 rounded-full w-fit mb-3 sm:mb-4">
                  <pillar.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 flex-grow">
                <p className="text-muted-foreground text-sm">{pillar.description}</p>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-2 sm:pt-4 border-t flex justify-center">
                 <Link href={pillar.href}>
                    <Button variant="link" className="text-sm">Learn More <ArrowRight className="ml-1 h-3 w-3"/></Button>
                 </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Statement & Motto Section */}
      <section className="bg-primary/5 p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <div className="text-center max-w-3xl mx-auto">
            <SectionTitle title="Our Guiding Words" className="text-center"/>
             <div className="mb-6 md:mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1 sm:mb-2">Mission Statement</h3>
                <blockquote className="text-lg sm:text-xl italic text-foreground border-l-4 border-primary pl-3 sm:pl-4 py-1 sm:py-2">
                "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
                </blockquote>
            </div>
            <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1 sm:mb-2">Motto</h3>
                <p className="text-lg sm:text-xl italic text-foreground">
                "Love God and love others."
                </p>
            </div>
        </div>
      </section>


      {/* Vision Section */}
      <section>
        <SectionTitle title="Our Vision for EDM" subtitle="Building a legacy of faith and service" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <Card className="shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Target className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="text-xl sm:text-2xl">Campus for Christ in Sierra Leone</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground text-sm sm:text-base mb-4">
                Our long-term vision includes building a dedicated campus for the body of Christ in Sierra Leone. This hub will feature a retreat center, the EDM Marifa School (now operational), future Bible school, lodging, recreation facilities, a chapel, and more, serving as a beacon for growth, training, and outreach.
              </p>
              <Image src="https://source.unsplash.com/random/600x350/?school,campus,africa,building" alt="EDM Campus Vision" width={600} height={350} className="rounded-md shadow-md" data-ai-hint="architectural rendering school campus africa" />
            </CardContent>
          </Card>
          <div className="space-y-4 md:space-y-6">
            <Card className="shadow-md">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Milestone className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  <CardTitle className="text-lg sm:text-xl">Key Goals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm p-4 sm:p-6">
                <h4 className="font-semibold text-foreground mb-1">Short-Term:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2 sm:mb-3">
                  <li>Support the operational EDM Marifa Secondary School (<Link href="/ministries/education/marifa-school" className="text-primary hover:underline">details</Link>).</li>
                  <li>Get the van and equipment through customs.</li>
                  <li>Finalize land acquisition for the main campus.</li>
                  <li>Establish international board members.</li>
                  <li>Conduct evangelism training sessions.</li>
                  <li>Utilize the "Jesus" movie for evangelism.</li>
                </ul>
                <h4 className="font-semibold text-foreground mb-1">Long-Term:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Build additional facilities on the EDM campus (Bible school, retreat center/meeting hall).</li>
                  <li>Extend the mission to other cities in Sierra Leone.</li>
                  <li>Establish key operational departments.</li>
                </ul>
              </CardContent>
            </Card>
             <Link href="/the-mission" className="block">
                <Button variant="default" className="w-full md:w-auto text-sm sm:text-base">
                Learn More About Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Recent News & Updates Preview */}
      <section>
        <SectionTitle title="News & Updates" subtitle="Latest from EDM" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {recentNews.map(post => (
            <Card key={post.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Link href={post.slug} className="block">
                <Image src={post.image} alt={post.title} width={400} height={250} className="w-full h-40 sm:h-48 object-cover" data-ai-hint={post.dataAiHint} />
              </Link>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:text-primary transition-colors"><Link href={post.slug}>{post.title}</Link></h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">{post.excerpt}</p>
                <Link href={post.slug}>
                  <Button variant="outline" className="w-full text-xs sm:text-sm">
                    Read More <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6 md:mt-8">
          <Link href="/news">
            <Button variant="default" className="text-sm sm:text-base">
              All News & Updates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action - Donate / Get Involved */}
      <section className="bg-card py-12 md:py-16 rounded-lg shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="Partner With EDM" subtitle="Your support makes a difference in Sierra Leone & Oregon" className="text-center" />
          <p className="text-muted-foreground max-w-md md:max-w-2xl mx-auto mb-6 md:mb-8 text-sm sm:text-base">
            Join us in our mission to spread the Gospel and make a lasting impact. Whether through prayer, giving, or volunteering, your contribution is invaluable.
          </p>
          <div className="flex flex-nowrap justify-center items-center space-x-2 sm:space-x-3">
            <Link href="/donate">
              <Button size="sm" variant="default" className="whitespace-nowrap text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
                Donate Now <HelpingHand className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button size="sm" variant="outline" className="whitespace-nowrap text-xs px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
                Get Involved <Users className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
