
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Target, Users, Globe, HeartHandshake, BookOpenText, Building, Milestone, Eye, TrendingUp, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OurMissionPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Our Mission: Evangelism, Discipleship, Missions"
        subtitle="EDM is a Christian organization in Sierra Leone, West Africa, called to evangelism, discipleship, and missions in that part of the world."
        icon={Target}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Who We Are" />
          <p className="text-lg text-muted-foreground mb-4">
            EDM (Evangelism, Discipleship, Missions) is a Christian organization rooted in Sierra Leone, West Africa. We are committed to fulfilling the Great Commission through dynamic Evangelism in local communities, intentional Discipleship to build strong believers, and impactful Missions to serve those in need.
          </p>
          <p className="text-lg text-muted-foreground">
            Our work is driven by the belief in the transformative power of the Gospel to change lives, build communities, and bring hope to Sierra Leone and beyond, with key partnerships extending to Oregon, USA.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://placehold.co/600x400.png"
            alt="EDM team working in Sierra Leone"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="sierra leone mission team"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Our Journey: How It All Started" />
        <Card className="shadow-lg">
          <CardContent className="p-6 text-muted-foreground space-y-4 text-md">
            <p>Years ago, God put a burden on my heart for issues I noticed in the church. The church was often focused inwardly—on programs, budgets, and activities—while sometimes neglecting those outside its walls. This concern resonated with <Link href="https://www.biblegateway.com/passage/?search=Ephesians+2%3A3-4&version=NIV" target="_blank" className="text-primary hover:underline">Ephesians 2:3-4</Link>, which reminds us of God's rich mercy and great love with which He loved us, even when we were dead in our trespasses, making us alive together with Christ.</p>
            <p>I observed a lack of formal training structures for new converts to grow in maturity in the faith. Yet, the purpose of God for our salvation is to grow to become like Christ Jesus. The Great Commission in <Link href="https://www.biblegateway.com/passage/?search=Matthew+28%3A18-20&version=NIV" target="_blank" className="text-primary hover:underline">Matthew 28:18-20</Link> commands us: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you."</p>
            <p>Looking at the church, it seemed that evangelism was not always given the priority it deserved. <Link href="https://www.biblegateway.com/passage/?search=Romans+10%3A13-15&version=NIV" target="_blank" className="text-primary hover:underline">Romans 10:13-15</Link> asks, "How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?"</p>
            <p>As I studied, prayed, and reflected on these challenges, the vision for EDM began to form. The organization was structured around three core pillars: Evangelism, Discipleship, and Missions.</p>
          </CardContent>
        </Card>
      </section>
      
      <section className="text-center bg-primary/5 p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Our Guiding Principles" className="text-center" />
        <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary mb-2">Mission Statement</h3>
            <blockquote className="text-xl italic text-foreground mb-6 border-l-4 border-primary pl-4 py-2">
              "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
            </blockquote>
            <h3 className="text-2xl font-semibold text-primary mb-2">Motto</h3>
            <p className="text-xl italic text-foreground">
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
              <CardTitle className="text-center">A Campus for Christ in Sierra Leone</CardTitle>
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
              <ul className="list-none text-muted-foreground text-sm space-y-2">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" /> Get the van and equipment through customs.</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" /> Finalize land acquisition.</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" /> Establish international board members.</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" /> Begin construction of the school.</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" /> Conduct evangelism training.</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" /> Show the "Jesus" movie for evangelism.</li>
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
              <ul className="list-none text-muted-foreground text-sm space-y-2">
                <li className="flex items-center"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0" /> Build facilities on the EDM campus (Bible school, retreat center/meeting hall).</li>
                <li className="flex items-center"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0" /> Extend the mission to other cities in Sierra Leone.</li>
                <li className="flex items-center"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0" /> Establish key departments: Education, Training, Outreach/Missions, Development/Projects, Church Ministry, Building & Maintenance.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

       <section>
        <SectionTitle title="Current Updates" />
         <Card className="shadow-lg bg-primary/5">
            <CardHeader>
                <CardTitle className="text-primary">Progress and Urgent Needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Land Acquired:</strong> We praise God that we have acquired land to build the school and a retreat center for the Body of Christ in Sierra Leone!</p>
                <p><strong className="text-foreground">Van & Equipment:</strong> A van and musical instruments were shipped in August and are expected to arrive the first week of October. These are vital for our outreach.</p>
                <p className="font-semibold text-destructive"><strong className="text-foreground">Urgent Need:</strong> There is an outstanding balance of $3,500.00 to pay customs in Freetown for the van and equipment. Your support is crucial to clear these items.</p>
            </CardContent>
            <CardFooter>
                <Link href="/donate">
                    <Button variant="default">Help Meet This Need</Button>
                </Link>
            </CardFooter>
         </Card>
       </section>

      <section className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Join Us on Our Journey" className="text-center" />
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
          We invite you to partner with EDM. Whether through prayer, financial support for our work in Sierra Leone and Oregon, or volunteering your time and talents, you can be a part of this life-changing work. Together, we can make a lasting difference.
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
