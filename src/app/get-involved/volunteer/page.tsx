
'use client';

import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, Wrench, Laptop, GraduationCap, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import VolunteerSignupForm from '@/components/volunteer/volunteer-signup-form';

const volunteerAreas = [
  {
    title: 'Local Outreach in Sierra Leone',
    icon: Users,
    description: 'Join our teams in Sierra Leone for evangelism, community service, and supporting local church activities. Short-term and long-term opportunities available.',
    dataAiHint: "volunteers africa community",
  },
  {
    title: 'Skills-Based Volunteering (Remote/Local)',
    icon: Laptop,
    description: 'Offer your professional skills (e.g., IT, graphic design, writing, marketing, accounting) to support EDM\'s operations either remotely or on-site in Sierra Leone/Oregon.',
    dataAiHint: "person working laptop remotely",
  },
  {
    title: 'Educational Support in Sierra Leone',
    icon: GraduationCap,
    description: 'Assist with our EDM Marifa School, help with teaching, teacher training, or curriculum development.',
    dataAiHint: "teacher classroom africa",
  },
  {
    title: 'Practical Help & Maintenance (Sierra Leone)',
    icon: Wrench,
    description: 'Contribute to building and maintenance projects at our future EDM campus in Sierra Leone, or assist with logistics for equipment and supplies.',
    dataAiHint: "construction workers tools",
  },
  {
    title: 'Oregon Partnership Support',
    icon: Heart,
    description: 'Help our Oregon-based team with awareness campaigns, fundraising events, administrative tasks, and coordinating support for Sierra Leone.',
    dataAiHint: "team meeting office oregon",
  },
];

export default function VolunteerPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Volunteer with EDM"
        subtitle="Use your God-given talents to serve in Sierra Leone or support our Oregon partnerships."
        icon={Heart}
      />

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Make a Tangible Difference" />
          <p className="text-base sm:text-lg text-muted-foreground">
            Volunteers are the hands and feet of EDM. Whether you can travel to Sierra Leone, offer skills remotely, or support our efforts in Oregon, your contribution is invaluable. We seek passionate individuals ready to serve and share God's love.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Explore the various ways you can volunteer and become an active part of our mission.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 md:h-80">
          <Image
            src="https://plus.unsplash.com/premium_photo-1681195079271-cbfd9ba1cbc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9sdW50ZWVyaW5nfGVufDB8fDB8fHww"
            alt="Volunteers making a tangible difference"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="volunteering hands community"
          />
        </div>
      </section>

      <SectionTitle title="Volunteer Opportunities" subtitle="Find where your skills and passion fit best" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {volunteerAreas.map((area) => (
          <Card key={area.title} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
            <CardHeader className="items-center text-center p-4">
              <div className="p-3 bg-primary/10 rounded-full mb-2 w-fit">
                <area.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl">{area.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center p-4 pt-0 flex-grow">
              <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden mb-3">
                <Image 
                    src={`https://source.unsplash.com/random/400x250/?${area.dataAiHint.replace(/\s/g,',')}`} 
                    alt={area.title} 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                    data-ai-hint={area.dataAiHint} />
              </div>
              <p className="text-muted-foreground text-sm">{area.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="text-center bg-card p-6 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Ready to Volunteer?" subtitle="Fill out the form below to express your interest" className="text-center" />
        <div className="max-w-2xl mx-auto">
            <VolunteerSignupForm />
        </div>
      </section>
    </div>
  );
}
