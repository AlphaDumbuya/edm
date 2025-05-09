import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Globe, HeartHandshake, BookOpenText } from 'lucide-react';
import Image from 'next/image';

export default function OurMissionPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Mission"
        subtitle="Dedicated to Evangelism, Discipleship, and Missions worldwide."
        icon={Target}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Who We Are" />
          <p className="text-lg text-muted-foreground mb-4">
            EDM Connect is a global Christian organization committed to fulfilling the Great Commission. We believe in the transformative power of the Gospel to change lives, build communities, and bring hope to a world in need.
          </p>
          <p className="text-lg text-muted-foreground">
            Our work is rooted in three core pillars: dynamic Evangelism, intentional Discipleship, and impactful Missions. We strive to equip believers, empower leaders, and engage in compassionate outreach across diverse cultures and contexts.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/missionteam/600/400"
            alt="Mission team in action"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="diverse team working"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Our Core Values" className="text-center" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Faith-Driven', description: 'Our actions are guided by unwavering faith in God and His Word.', icon: BookOpenText },
            { title: 'Christ-Centered', description: 'Jesus is at the heart of all we do, our motivation and our message.', icon: HeartHandshake },
            { title: 'Community Focused', description: 'Building strong, supportive communities of believers.', icon: Users },
            { title: 'Global Impact', description: 'Reaching across borders to share God\'s love with all nations.', icon: Globe },
            { title: 'Integrity & Accountability', description: 'Operating with transparency and stewardship in all our endeavors.', icon: Target },
            { title: 'Compassionate Service', description: 'Serving others with love, humility, and respect, reflecting Christ\'s example.', icon: Users },
          ].map((value) => (
            <Card key={value.title} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Join Us on Our Journey" className="text-center" />
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
          We invite you to partner with EDM Connect. Whether through prayer, financial support, or volunteering your time and talents, you can be a part of this life-changing work. Together, we can make a lasting difference in the lives of individuals and communities around the world.
        </p>
        <div className="text-center mt-8">
          <Link href="/donate" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md text-lg font-medium transition-colors">
            Support Our Mission
          </Link>
        </div>
      </section>
    </div>
  );
}

// Added a simple Link import for the donate button
import Link from 'next/link';
