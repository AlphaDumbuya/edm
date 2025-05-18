
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, HeartHandshake, Mail, ArrowLeft, Gift, HandCoins, Volume2, Users as UsersIcon, Briefcase, Building } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function IndividualPartnershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Partner as an Individual"
        subtitle="Join our mission in Sierra Leone & Oregon personally and make a direct impact."
        icon={User}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Your Personal Impact in Sierra Leone & Oregon" />
          <p className="text-lg text-muted-foreground">
            Every individual has God-given talents that can contribute to the Kingdom in Sierra Leone or through our Oregon partnerships. At EDM, we value your unique ability to make a difference, whether through prayer, volunteering, advocacy, or financial support.
          </p>
          <p className="text-lg text-muted-foreground">
            Discover how you can align your heart with our mission in these key regions and become an active participant in spreading the Gospel.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://media.istockphoto.com/id/2099408907/photo/smiling-young-businessman-standing-with-his-arms-crossed-against-an-office-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=N0rshqVGbuvJ6zFWKLzkwbulYEqqx1mtWzu_eSSOQXE="
            alt="Individual ready to partner with EDM"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="professional person smiling"
          />
        </div>
      </section>

      <SectionTitle title="Ways You Can Partner" subtitle="Explore opportunities to get involved in Sierra Leone & Oregon" />
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
              Commit to praying for our missionaries in Sierra Leone, projects in both regions, and the unreached. Join our prayer network for specific updates.
            </p>
            <div className="text-center mt-4">
                <Link href="/get-involved/prayer">
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
              Offer time and talents for Sierra Leone projects (local/remote) or assist Oregon-based support efforts. Skills like admin, design, or IT are valuable.
            </p>
             <div className="text-center mt-4">
                <Link href="/get-involved/volunteer">
                    <Button variant="outline" size="sm">Volunteer Sign-up</Button>
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
              Be a voice for EDM's work in Sierra Leone and our Oregon connections within your community. Share stories and opportunities for involvement.
            </p>
            <div className="text-center mt-4">
                <Link href="mailto:ambassador@edm.org?subject=Ambassador%20Inquiry">
                     <Button variant="outline" size="sm">Learn About Ambassadorship</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow lg:col-span-3 md:col-span-2">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <HandCoins className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Financial Giving for Sierra Leone & Oregon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Your financial contributions directly support our evangelism, discipleship, and mission projects in Sierra Leone, and our collaborative work with Oregon partners.
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
        <SectionTitle title="Ready to Make a Personal Impact in Sierra Leone or Oregon?" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We're excited to explore how your passion and skills can align with EDM's mission in these regions. If you have questions or want to discuss involvement, please reach out.
        </p>
        <Link href="mailto:individuals@edm.org?subject=Individual%20Partnership%20Inquiry">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Contact Us About Individual Partnership
          </Button>
        </Link>
      </section>

      <div className="text-center mt-12">
        <Link href="/get-involved/partner">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Partnership Overview</Button>
        </Link>
      </div>
    </div>
  );
}
