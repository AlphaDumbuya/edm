
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Milestone, Users, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="About EDM"
        subtitle="Evangelism, Discipleship, Missions: Our Story, Foundations, and Structure in Sierra Leone and Oregon"
        icon={Info}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="How It All Started" />
          <div className="text-lg text-muted-foreground space-y-4">
            <p className="font-semibold text-foreground mb-2">The vision for EDM was laid on the heart of our founder, Edwin Kargbo. He shares:</p>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              <p>
                "Years ago, God put a burden on my heart for issues I noticed in the church. The church was often focused inwardly—on programs, budgets, and activities—while sometimes neglecting those outside its walls. This concern resonated with <Link href="https://www.biblegateway.com/passage/?search=Ephesians+2%3A3-4&version=NIV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ephesians 2:3-4</Link>, which reminds us of God's rich mercy and great love.
              </p>
              <p>
                I observed a lack of formal training structures for new converts to grow in maturity in the faith. Yet, the purpose of God for our salvation is to grow to become like Christ Jesus. The Great Commission in <Link href="https://www.biblegateway.com/passage/?search=Matthew+28%3A18-20&version=NIV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Matthew 28:18-20</Link> commands us to make disciples and teach them.
              </p>
              <p>
                Looking at the church, it seemed that evangelism was not always given the priority it deserved, despite the call in <Link href="https://www.biblegateway.com/passage/?search=Romans+10%3A13-15&version=NIV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Romans 10:13-15</Link>.
              </p>
              <p>
                As I studied, prayed, and reflected on these challenges, the vision for EDM began to form. The organization was structured around three core pillars: Evangelism, Discipleship, and Missions."
              </p>
            </blockquote>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-96 relative">
          <Image
            src="https://source.unsplash.com/random/600x450/?bible,study,prayer,journal"
            alt="Prayer and study leading to EDM's formation in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="bible study prayer journal"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Our Scripture Foundations" />
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Ephesians 2:3-4</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">"...among whom we all once lived in the passions of our flesh, carrying out the desires of the body and the mind, and were by nature children of wrath, like the rest of mankind. But God, being rich in mercy, because of the great love with which he loved us..."</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Matthew 28:18-20</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">"And Jesus came and said to them, 'All authority in heaven and on earth has been given to me. Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you...'"</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Romans 10:13-15</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">"For 'everyone who calls on the name of the Lord will be saved.' How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?"</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <SectionTitle title="Our Structure & Focus" />
        <Card className="bg-card shadow-lg">
          <CardContent className="p-6 text-muted-foreground space-y-4">
            <p>
              EDM is a Christian organization rooted in Sierra Leone, West Africa. We are committed to fulfilling the Great Commission through dynamic Evangelism in local communities, intentional Discipleship to build strong believers, and impactful Missions to serve those in need. Our work is driven by the belief in the transformative power of the Gospel to change lives, build communities, and bring hope to Sierra Leone and beyond, with key partnerships extending to Oregon, USA.
            </p>
            <p>
              The organization is structured to effectively carry out its three core mandates:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-foreground">
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

       <section className="text-center">
        <Link href="/about/what-we-believe">
          <Button variant="default" size="lg">
            What We Believe
          </Button>
        </Link>
      </section>
    </div>
  );
}
