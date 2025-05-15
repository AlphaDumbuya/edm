
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Globe, HeartHandshake, BookOpenText, Building, Milestone, Eye, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OurMissionPage() {
  return (
    <div className="space-y-16">
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
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://picsum.photos/seed/missionsl/600/400"
            alt="Mission team in Sierra Leone"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="sierra leone team working"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Our Journey: How It All Started" />
        <Card className="shadow-lg">
          <CardContent className="p-6 text-muted-foreground space-y-4">
            <p>Years ago, God put a burden on my heart for issues I noticed in the church. The church was often focused inwardly—on programs, budgets, and activities—while sometimes neglecting those outside its walls. This concern resonated with Ephesians 2:3-4, which reminds us of God's rich mercy and great love with which He loved us, even when we were dead in our trespasses, making us alive together with Christ.</p>
            <p>I observed a lack of formal training structures for new converts to grow in maturity in the faith. Yet, the purpose of God for our salvation is to grow to become like Christ Jesus. The Great Commission in Matthew 28:18-20 commands us: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you."</p>
            <p>Looking at the church, it seemed that evangelism was not always given the priority it deserved. Romans 10:13-15 asks, "How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?"</p>
            <p>As I studied, prayed, and reflected on these challenges, the vision for EDM began to form. The organization was structured around three core pillars: Evangelism, Discipleship, and Missions.</p>
          </CardContent>
        </Card>
      </section>
      
      <section className="text-center bg-primary/5 p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Our Guiding Principles" className="text-center" />
        <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary mb-2">Mission Statement</h3>
            <p className="text-lg text-foreground mb-6">
              "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
            </p>
            <h3 className="text-2xl font-semibold text-primary mb-2">Motto</h3>
            <p className="text-lg text-foreground">
              "Love God and love others."
            </p>
        </div>
      </section>

      <section>
        <SectionTitle title="Our Vision for EDM" />
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">A Campus for Christ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm text-center">Our long-term vision includes building a dedicated campus for the body of Christ in Sierra Leone, featuring a retreat center, school, lodging, recreation facilities, a chapel, and more, to serve as a hub for growth and outreach.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Milestone className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Short-Term Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Finalize land acquisition.</li>
                <li>Establish international board members.</li>
                <li>Begin construction of the school.</li>
                <li>Conduct evangelism training.</li>
                <li>Utilize resources like the "Jesus" movie for evangelism.</li>
                <li>Clear the van and equipment through customs.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Long-Term Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Complete facilities on the EDM campus (Bible school, retreat center).</li>
                <li>Extend the mission to other cities in Sierra Leone and West Africa.</li>
                <li>Establish key departments: Education, Training, Outreach/Missions, Development/Projects, Church Ministry, Building &amp; Maintenance.</li>
              </ul>
            </CardContent>
          </Card>
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
            { title: 'Integrity &amp; Accountability', description: 'Operating with transparency and stewardship in all our endeavors.', icon: Target },
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
