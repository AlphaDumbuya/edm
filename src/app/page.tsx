import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionTitle from '@/components/shared/section-title';
import PageHeader from '@/components/shared/page-header';
import { ArrowRight, CalendarDays, Users, BookOpenText, HeartHandshake, MapPin, Images, HelpingHand } from 'lucide-react';

// Dummy data for previews
const upcomingEvents = [
  { id: 1, title: 'Global Mission Conference', date: 'October 15-17, 2024', location: 'Online', image: 'https://picsum.photos/seed/event1/400/250', dataAiHint: 'conference crowd' },
  { id: 2, title: 'Local Outreach Program', date: 'November 5, 2024', location: 'City Park', image: 'https://picsum.photos/seed/event2/400/250', dataAiHint: 'community volunteering' },
];

const recentBlogPosts = [
  { id: 1, title: 'The Heart of Evangelism', excerpt: 'Exploring the core principles of sharing faith effectively...', slug: 'the-heart-of-evangelism', image: 'https://picsum.photos/seed/blog1/400/250', dataAiHint: 'open bible' },
  { id: 2, title: 'Discipleship in the Modern Age', excerpt: 'Navigating the challenges and opportunities of mentorship today...', slug: 'discipleship-modern-age', image: 'https://picsum.photos/seed/blog2/400/250', dataAiHint: 'mentor silhouette' },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20 md:py-32 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/hero/1200/800"
            alt="Mission work"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="diverse people community"
          />
          <div className="absolute inset-0 bg-background/30"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Welcome to <span className="text-primary">EDM</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Evangelism, Discipleship, Missions: Spreading hope, building faith, and transforming lives across the globe.
          </p>
          <div className="space-x-4">
            <Link href="/about/mission">
              <Button size="lg" variant="default">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="lg" variant="outline">
                Support Our Mission <HelpingHand className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section>
        <SectionTitle title="Our Core Pillars" subtitle="The foundation of our ministry" />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Evangelism', description: 'Sharing the good news of Jesus Christ with love and conviction.', icon: BookOpenText },
            { title: 'Discipleship', description: 'Nurturing believers to grow in their faith and become like Christ.', icon: Users },
            { title: 'Missions', description: 'Reaching out to communities near and far with compassion and service.', icon: HeartHandshake },
          ].map((pillar) => (
            <Card key={pillar.title} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <pillar.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section>
        <SectionTitle title="Upcoming Events" subtitle="Join us for fellowship and service" />
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map(event => (
            <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image src={event.image} alt={event.title} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={event.dataAiHint} />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-1 flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary" /> {event.date}</p>
                <p className="text-sm text-muted-foreground mb-4 flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" /> {event.location}</p>
                <Link href="/events">
                  <Button variant="outline" className="w-full">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/events">
            <Button variant="default">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Blog Posts Preview */}
      <section>
        <SectionTitle title="From Our Blog" subtitle="Insights, stories, and updates" />
        <div className="grid md:grid-cols-2 gap-8">
          {recentBlogPosts.map(post => (
            <Card key={post.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image src={post.image} alt={post.title} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={post.dataAiHint} />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog">
            <Button variant="default">
              Visit Our Blog <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action - Donate / Get Involved */}
      <section className="bg-card py-16 rounded-lg shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="Partner With Us" subtitle="Your support makes a difference" className="text-center" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join us in our mission to spread the Gospel and make a lasting impact. Whether through prayer, giving, or volunteering, your contribution is invaluable.
          </p>
          <div className="space-x-4">
            <Link href="/donate">
              <Button size="lg" variant="default">
                Donate Now <HelpingHand className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact"> {/* Assuming a contact page might exist or be added */}
              <Button size="lg" variant="outline">
                Get Involved <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
