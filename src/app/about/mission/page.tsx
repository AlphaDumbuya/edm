import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Globe, HeartHandshake, BookOpenText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OurMissionPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Mission"
        subtitle="Dedicated to Evangelism, Discipleship, and Missions in Sierra Leone, Ohio, and beyond."
        icon={Target}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Who We Are" />
          <p className="text-lg text-muted-foreground mb-4">
            EDM is a Christian organization, rooted in Sierra Leone and extending its reach through partnership to Ohio, USA, committed to fulfilling the Great Commission. We believe in the transformative power of the Gospel to change lives, build communities, and bring hope.
          </p>
          <p className="text-lg text-muted-foreground">
            Our work is focused on three core pillars: dynamic Evangelism in local communities, intentional Discipleship to build strong believers, and impactful Missions to serve those in need. We strive to equip individuals in Sierra Leone, empower leaders through our Ohio connections, and engage in compassionate outreach.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/missionsl/600/400"
            alt="Mission team in Sierra Leone"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="sierra leone team working"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Our Core Values" className="text-center" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Faith-Driven', description: 'Our actions are guided by unwavering faith in God and His Word.', icon: BookOpenText },
            { title: 'Christ-Centered', description: 'Jesus is at the heart of all we do, our motivation and our message.', icon: HeartHandshake },
            { title: 'Community Focused', description: 'Building strong, supportive communities in Sierra Leone and with our Ohio partners.', icon: Users },
            { title: 'Targeted Impact', description: 'Reaching across Sierra Leone and collaborating with partners in Ohio to share God\'s love.', icon: Globe },
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
          We invite you to partner with EDM. Whether through prayer, financial support for our work in Sierra Leone and Ohio, or volunteering your time and talents, you can be a part of this life-changing work. Together, we can make a lasting difference.
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

