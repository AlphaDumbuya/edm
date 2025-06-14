
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Target, Users, Globe, HeartHandshake, BookOpenText, Building, Milestone, Eye, TrendingUp, CheckCircle, ShieldCheck, School, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OurMissionPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Our Mission: Evangelism, Discipleship, Missions"
        subtitle="EDM is a Christian organization in Sierra Leone, West Africa, called to evangelism, discipleship, and missions in that part of the world. EDM is a registered 501(c)(3) non-profit organization."
        icon={Target}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-3 md:space-y-4">
          <SectionTitle title="Who We Are" />
          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            Evangelism, Discipleship, Missions (EDM) is a Christian organization rooted in Sierra Leone, West Africa. We are committed to fulfilling the Great Commission through dynamic Evangelism in local communities, intentional Discipleship to build strong believers, and impactful Missions to serve those in need.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Our work is driven by the belief in the transformative power of the Gospel to change lives, build communities, and bring hope to Sierra Leone and beyond, with key partnerships extending to Oregon, USA. EDM is a registered 501(c)(3) non-profit organization.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 relative">
          <Image
            src="https://source.unsplash.com/random/600x400/?sierra,leone,mission,team"
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
          <CardContent className="p-4 md:p-6 text-muted-foreground space-y-3 md:space-y-4 text-sm sm:text-base">
            <p className="font-semibold text-foreground">The vision for EDM was laid on the heart of our founder, Edwin Kargbo. He shares:</p>
            <blockquote className="border-l-4 border-primary pl-3 md:pl-4 italic space-y-2 sm:space-y-3">
                <p>
                  "Years ago God put a burden on my heart for issues I noticed in the church.
                  The church was focused inwardly (programs, budgets, activities), while neglecting others outside.
                  This concern resonated with <Link href="https://www.biblegateway.com/passage/?search=Ephesians+2%3A3-4&version=NIV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ephesians 2:3-4</Link>."
                </p>
                <p>
                  "There was no formal training structure for new converts to grow in maturity in the faith.
                  The purpose of God for our salvation is to grow to become like Christ Jesus.
                  This aligns with the Great Commission in <Link href="https://www.biblegateway.com/passage/?search=Matthew+28%3A18-20&version=NIV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Matthew 28:18-20</Link>."
                </p>
                <p>
                  "When I look at the church, priority is not given to evangelism.
                  This is despite the clear call in <Link href="https://www.biblegateway.com/passage/?search=Romans+10%3A13-15&version=NIV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Romans 10:13-15</Link>."
                </p>
                <p>
                  "As I was studying and praying I began to form the organization and came up with the structure of EDM: Evangelism, Discipleship, and Missions."
                </p>
            </blockquote>
          </CardContent>
        </Card>
      </section>
      <section className="text-center bg-primary/5 p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Our Guiding Principles" className="text-center" />
        <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1 sm:mb-2">Purpose Statement</h3>
            <blockquote className="text-lg sm:text-xl italic text-foreground mb-6 border-l-4 border-primary pl-3 sm:pl-4 py-1 sm:py-2">
              "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
            </blockquote>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1 sm:mb-2">Motto</h3>
            <p className="text-lg sm:text-xl italic text-foreground">
              "Love God and love others."
            </p>
        </div>
      </section>
      <section>
        <SectionTitle title="Our Vision for EDM" />
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Building className="h-7 w-7 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-lg sm:text-xl">A Campus for Christ in Sierra Leone</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground text-sm sm:text-base text-center">Our long-term vision includes building a dedicated campus for the body of Christ in Sierra Leone, featuring a retreat center, the operational EDM Marifa School, a future Bible school, lodging, recreation facilities, a chapel, and more, to serve as a hub for growth and outreach.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Milestone className="h-7 w-7 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-lg sm:text-xl">Short-Term Goals</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ul className="list-none text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
                <li className="flex items-start"><School className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Support and develop the operational <Link href="/ministries/education/marifa-school" className="text-primary hover:underline">EDM Marifa Secondary School</Link>.</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Get the van and equipment through customs.</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Finalize land acquisition for the main campus.</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Establish international board members.</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Conduct evangelism training.</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Show the "Jesus" movie for evangelism.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <TrendingUp className="h-7 w-7 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-lg sm:text-xl">Long-Term Goals</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ul className="list-none text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
                <li className="flex items-start"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0 mt-1" /> Build additional facilities on the EDM campus (Bible school, retreat center/meeting hall).</li>
                <li className="flex items-start"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0 mt-1" /> Extend the mission to other cities in Sierra Leone.</li>
                <li className="flex items-start"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0 mt-1" /> Establish key departments: Education, Training, Outreach/Missions, Development/Projects, Church Ministry, Building & Maintenance.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
       <SectionTitle title="Current Updates & Needs" />
        <Card className="shadow-lg bg-primary/5">
           <CardHeader className="p-4 sm:p-6">
               <CardTitle className="text-primary text-base sm:text-lg md:text-xl">Progress and Support Opportunities</CardTitle>
           </CardHeader>
           <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6 text-xs sm:text-sm md:text-base text-muted-foreground">
               <p><strong className="text-foreground">EDM Marifa School Operational:</strong> We praise God that the EDM Marifa Secondary School is now operational, serving the community and sharing the Gospel! <Link href="/ministries/education/marifa-school" className="text-primary hover:underline font-semibold">Learn more & support the school.</Link></p>
               <p><strong className="text-foreground">Land Acquired:</strong> We praise God that we have acquired land for the main EDM campus and a retreat center for the Body of Christ in Sierra Leone!</p>
               <p><strong className="text-foreground">Van & Equipment Arrived:</strong> The van and musical instruments have arrived in Freetown and are being prepared for ministry use. These are vital for our outreach efforts.</p>
           </CardContent>
           <CardFooter className="p-4 sm:p-6">
               <Link href="/donate?reason=current_projects" legacyBehavior>
                   <Button variant="default" size="sm" className="text-xs sm:text-sm">Help Support These Initiatives</Button>
               </Link>
           </CardFooter>
        </Card>
      </section>
      <section className="bg-card p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Join Us on Our Journey" className="text-center" />
        <p className="text-base sm:text-lg text-muted-foreground text-center max-w-3xl mx-auto">
          We invite you to partner with EDM. Whether through prayer, financial support for our work in Sierra Leone and Oregon, or volunteering your time and talents, you can be a part of this life-changing work. Together, we can make a lasting difference.
        </p>
        <div className="text-center mt-6 md:mt-8">
          <Link href="/donate" legacyBehavior>
            <Button size="lg" variant="default" className="text-sm sm:text-base">Support Our Mission</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
