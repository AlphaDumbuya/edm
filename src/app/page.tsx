'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import SectionTitle from '@/components/shared/section-title';
import {
  ArrowRight,
  Users,
  BookOpenText,
  HeartHandshake,
  HelpingHand,
  Target,
  Milestone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const recentNews = [
  {
    id: 1,
    title: 'EDM Marifa School: Now Operating!',
    excerpt: 'Exciting updates from our operational secondary school in Marifa, shaping young lives...',
    slug: '/news/edm-marifa-school-operational',
    image: 'https://code-alpha-image-gallary.vercel.app/edm-marifa1.JPG',
    dataAiHint: 'school children marifa',
  },
  {
    id: 2,
    title: 'Ministry Van & Equipment Arriving Soon!',
    excerpt:
      'The van and musical instruments shipped from our Oregon partners are expected to arrive in Freetown soon. These tools are vital for our outreach.',
    slug: '/news/van-equipment-arrival-news',
    image: 'https://source.unsplash.com/random/400x250/?shipping,logistics,port,africa',
    dataAiHint: 'shipping logistics port',
  },
];

const pillars = [
  {
    title: 'Evangelism',
    description:
      'Actively sharing the good news of Jesus Christ with unbelievers throughout Sierra Leone, compelled by Romans 10:13-15.',
    icon: BookOpenText,
    href: '/ministries/evangelism',
  },
  {
    title: 'Discipleship',
    description:
      'Training believers to maturity in faith, equipping them to disciple others as commanded in Matthew 28:18-20.',
    icon: Users,
    href: '/ministries/discipleship',
  },
  {
    title: 'Missions',
    description:
      "Reaching out with compassion and practical service, fulfilling God's call through tangible actions and local/rural outreach.",
    icon: HeartHandshake,
    href: '/ministries/missions-outreach',
  },
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
            fill
            className="object-cover opacity-40"
            data-ai-hint="christianity community children"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Welcome to <span className="text-primary">EDM</span>
          </h1>
          <p className="text-md md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Evangelism, Discipleship, Missions: Spreading hope, building faith, and transforming lives in Sierra Leone, West Africa, with vital partnerships in Oregon, USA.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Link href="/about">
              <span className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'flex items-center gap-1')}>
                Our Story <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/donate">
              <span
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'border border-white text-white hover:bg-white/20 flex items-center gap-1'
                )}
              >
                Support EDM <HelpingHand className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section>
        <SectionTitle title="Our Three Pillars" subtitle="The foundation of EDM's ministry in Sierra Leone" />
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map(({ title, description, icon: Icon, href }) => (
            <Card key={title} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-4 sm:p-6">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">{title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-4 flex-grow">
                <p className="text-muted-foreground text-sm">{description}</p>
              </CardContent>
              <CardFooter className="pb-6 pt-2">
                <Link href={href} className={cn(buttonVariants({ variant: 'link' }), 'text-sm')}>
                  Learn More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Statement & Motto Section */}
      <section className="bg-primary/5 p-6 md:p-12 rounded-lg shadow-lg">
        <div className="text-center max-w-3xl mx-auto">
          <SectionTitle title="Our Guiding Words" className="text-center" />
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-2">Purpose Statement</h3>
            <blockquote className="italic text-foreground border-l-4 border-primary pl-4 py-2">
              "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
            </blockquote>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-2">Motto</h3>
            <p className="italic text-foreground">"Love God and love others."</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section>
        <SectionTitle title="Our Vision for EDM" subtitle="Building a legacy of faith and service" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Campus for Christ in Sierra Leone</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                Our long-term vision includes building a dedicated campus for the body of Christ in Sierra Leone.
                This hub will feature a retreat center, the EDM Marifa School (now operational), future Bible school, lodging, recreation facilities, a chapel, and more.
              </p>
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                  src="https://source.unsplash.com/random/600x350/?school,campus,africa,building,community"
                  alt="EDM Campus Vision"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3">
                <Milestone className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl">Key Goals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm space-y-3 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground">Short-Term:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Support the EDM Marifa Secondary School (
                    <Link href="/ministries/education/marifa-school" className="text-primary hover:underline">
                      details
                    </Link>
                    ).
                  </li>
                  <li>Clear van and equipment through Freetown customs.</li>
                  <li>Finalize land acquisition for EDM Campus.</li>
                  <li>Establish international board for governance and oversight.</li>
                  <li>Run evangelism training for leaders and volunteers.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
