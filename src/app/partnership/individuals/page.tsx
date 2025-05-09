import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, HeartHandshake, Mail, Users, Briefcase, ArrowLeft, Gift, HandCoins, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function IndividualPartnershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Partner as an Individual"
        subtitle="Join our mission personally and make a direct impact through your unique contributions."
        icon={User}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Your Personal Impact" />
          <p className="text-lg text-muted-foreground">
            Every individual has God-given talents, resources, and passions that can contribute to the Kingdom. At EDM, we value your unique ability to make a difference. Whether through prayer, volunteering your skills, advocating for our cause, or providing financial support, your partnership is vital to transforming lives and communities.
          </p>
          <p className="text-lg text-muted-foreground">
            Discover how you can align your heart with our mission and become an active participant in spreading the Gospel.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/individualpartner/600/400"
            alt="Individual making a difference"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint="person helping volunteer"
          />
        </div>
      </section>

      <SectionTitle title="Ways You Can Partner" subtitle="Explore opportunities to get involved" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <HeartHandshake className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Prayer Partnership</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Commit to regularly praying for our missionaries, projects, and the unreached. Join our prayer network to receive updates and specific prayer points. Your prayers are the spiritual foundation of our work.
            </p>
            <div className="text-center mt-4">
                <Link href="/prayer">
                    <Button variant="outline" size="sm">Join Prayer Wall</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Volunteer Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Offer your time and talents. Opportunities range from assisting at local events, providing administrative support remotely, to using specialized skills like graphic design, writing, or IT for specific projects.
            </p>
             <div className="text-center mt-4">
                <Link href="mailto:volunteer@edm.org">
                    <Button variant="outline" size="sm">Inquire to Volunteer</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Volume2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Become an Ambassador</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Be a voice for EDM in your community, church, or social network. Share our stories, impact, and opportunities for involvement. We can provide resources to help you advocate effectively.
            </p>
            <div className="text-center mt-4">
                <Link href="mailto:ambassador@edm.org">
                     <Button variant="outline" size="sm">Learn About Ambassadorship</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow lg:col-span-3 md:col-span-2"> {/* Spanning for emphasis */}
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <HandCoins className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Financial Giving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Your financial contributions, whether one-time gifts or recurring donations, directly support our evangelism, discipleship, and mission projects worldwide. Every gift, no matter the size, makes a tangible difference.
            </p>
            <div className="text-center mt-6">
              <Link href="/donate">
                <Button size="lg">Donate Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Ready to Make a Personal Impact?" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We're excited to explore how your individual passion and skills can align with EDM's mission. If you have questions or want to discuss specific ways to get involved, please reach out.
        </p>
        <Link href="mailto:individuals@edm.org">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Contact Us About Individual Partnership
          </Button>
        </Link>
      </section>

      <div className="text-center mt-12">
        <Link href="/partnership">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Partnership Overview</Button>
        </Link>
      </div>
    </div>
  );
}
