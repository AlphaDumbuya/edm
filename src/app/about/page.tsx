
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Milestone, Users, Info, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="About EDM"
        subtitle="Evangelism, Discipleship, Missions: Our Story, Foundations, and Structure in Sierra Leone and Oregon"
        icon={Info}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="How It All Started" />
          <div className="text-base sm:text-lg text-muted-foreground space-y-3 md:space-y-4">
            <p className="font-semibold text-foreground mb-2">The vision for EDM was laid on the heart of the founder, Edwin Kargbo. He shares:</p>
            <blockquote className="border-l-4 border-primary pl-3 md:pl-4 italic text-sm sm:text-base space-y-3">
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
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 md:h-96 relative">
          <Image
            src="https://code-alpha-image-gallary.vercel.app/edwin-kargbo.png"
            alt="Edwin Kargbo, Founder of EDM"
            fill
            data-ai-hint="Edwin Kargbo founder"
            className="object-cover object-top"
          />
        </div>
      </section>
      <section>
        <SectionTitle title="Our Scripture Foundations" />
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-primary text-sm sm:text-base md:text-lg">Ephesians 2:3-4</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm text-muted-foreground">"...among whom we all once lived in the passions of our flesh, carrying out the desires of the body and the mind, and were by nature children of wrath, like the rest of mankind. But God, being rich in mercy, because of the great love with which he loved us..."</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-primary text-sm sm:text-base md:text-lg">Matthew 28:18-20</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm text-muted-foreground">"And Jesus came and said to them, 'All authority in heaven and on earth has been given to me. Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you...'"</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-primary text-sm sm:text-base md:text-lg">Romans 10:13-15</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm text-muted-foreground">"For 'everyone who calls on the name of the Lord will be saved.' How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?"</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        <SectionTitle title="Our Structure & Focus" />
        <Card className="bg-card shadow-lg">
          <CardContent className="p-4 md:p-6 text-sm sm:text-base text-muted-foreground space-y-3 md:space-y-4">
            <p>
              EDM is a Christian organization rooted in Sierra Leone, West Africa. We are committed to fulfilling the Great Commission through dynamic Evangelism in local communities, intentional Discipleship to build strong believers, and impactful Missions to serve those in need. Our work is driven by the belief in the transformative power of the Gospel to change lives, build communities, and bring hope to Sierra Leone and beyond, with key partnerships extending to Oregon, USA.
            </p>
            <p>
              The organization is structured to effectively carry out its three core mandates:
            </p>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1 md:space-y-2 text-foreground">
              <li><strong>Evangelism:</strong> Reaching the unreached with the message of Jesus Christ. This includes street outreach, the "Jesus" film project, and media evangelism in Sierra Leone.</li>
              <li><strong>Discipleship:</strong> Nurturing believers towards spiritual maturity and equipping them to train others. This involves discipleship training paths, curriculum development, and mentorship programs within Sierra Leone.</li>
              <li><strong>Missions:</strong> Engaging in church planting, local and rural community outreach in Sierra Leone, and partnering with local churches to extend God's kingdom.</li>
            </ul>
             <p>
              Supporting these core functions are planned departments for Education, Training, Development/Projects, Church Ministry, and Building & Maintenance, all crucial for our long-term vision, including the EDM Campus in Sierra Leone.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionTitle title="EDM Hierarchy - Sierra Leone" subtitle="Understanding the organizational structure guiding our ministry." />
        <Card className="bg-card shadow-lg">
          <CardContent className="p-4 md:p-6 text-sm sm:text-base text-muted-foreground space-y-3 md:space-y-4">
            <p>The leadership and operational structure of EDM in Sierra Leone is organized to ensure effective ministry and stewardship:</p>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1 md:space-y-2 text-foreground">
              <li><strong>CEO</strong></li>
              <li><strong>Country Director</strong></li>
              <li><strong>Administrator</strong></li>
              <li><strong>Finance</strong></li>
              <li><strong>Secretary to the Executive</strong></li>
              <li>
                <strong>Regional Coordinators</strong>
                <ul className="list-circle pl-4 sm:pl-5 space-y-1 text-muted-foreground">
                  <li>Northern Region</li>
                  <li>Southern Region</li>
                  <li>Eastern Region</li>
                  <li>Western Region</li>
                </ul>
              </li>
              <li>
                <strong>Programs Coordinators</strong>
                <ul className="list-circle pl-4 sm:pl-5 space-y-1 text-muted-foreground">
                  <li>Evangelism, Discipleship, Missions, Education Secretary, Project Manager, Building and Maintenance, P. R.O, Prayer</li>
                </ul>
              </li>
              <li><strong>ReGom/EDM Bible institute (West Region and North Region)</strong> (Under Discipleship)</li>
              <li><strong>Marifa School (Primary and Junior Secondary), Rosortta School (Junior Secondary)</strong> (Under Education)</li>
              <li><strong>Chief Corner Stone Construction Company</strong> (Under Building and Maintenance)</li>
            </ul>
          </CardContent>
        </Card>
      </section>

 <section>
 <SectionTitle title="EDM Hierarchy Portland Oregon" subtitle="The leadership structure for our base in Portland, Oregon." />
        <Card className="bg-card shadow-lg">
 <CardContent className="p-4 md:p-6 text-sm sm:text-base text-muted-foreground space-y-3 md:space-y-4">
 <p>The leadership team in Portland, Oregon supports the overall mission and activities of EDM:</p>
 <ul className="list-disc pl-4 sm:pl-5 space-y-1 md:space-y-2 text-foreground">
 <li><strong>President</strong></li>
 <li><strong>Vice President</strong></li>
 <li><strong>Secretary</strong></li>
 <li><strong>Treasure</strong></li>
 <li><strong>Adviser</strong></li>
 </ul>
 </CardContent>
 </Card>
 </section>

      <section className="text-center">
        <Button variant="default" size="lg" asChild>
          <Link href="/about/what-we-believe">
            What We Believe
          </Link>
        </Button>
     </section>
    </div>
  );
}
