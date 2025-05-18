
'use client';

import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, Wrench, Laptop, GraduationCap, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import VolunteerSignupForm from '@/components/volunteer/volunteer-signup-form'; // Import the form

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

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Make a Tangible Difference" />
          <p className="text-lg text-muted-foreground">
            Volunteers are the hands and feet of EDM. Whether you can travel to Sierra Leone, offer skills remotely, or support our efforts in Oregon, your contribution is invaluable. We seek passionate individuals ready to serve and share God's love.
          </p>
          <p className="text-lg text-muted-foreground">
            Explore the various ways you can volunteer and become an active part of our mission.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 md:h-80">
          <Image
            src="https://source.unsplash.com/random/600x400/?volunteers,teamwork,community"
            alt="Volunteers working together happily"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="diverse volunteers smiling"
          />
        </div>
      </section>

      <SectionTitle title="Volunteer Opportunities" subtitle="Find where your skills and passion fit best" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {volunteerAreas.map((area) => (
          <Card key={area.title} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 w-fit">
                <area.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{area.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Image src={`https://source.unsplash.com/random/400x250/?${area.dataAiHint.replace(/\s/g,',')}`} alt={area.title} width={400} height={250} className="rounded-md mb-4 mx-auto h-40 object-cover" data-ai-hint={area.dataAiHint} />
              <p className="text-muted-foreground text-sm">{area.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg mt-12">
        <SectionTitle title="Ready to Volunteer?" subtitle="Fill out the form below to express your interest" className="text-center" />
        <div className="max-w-2xl mx-auto">
            <VolunteerSignupForm />
        </div>
      </section>
    </div>
  );
}
