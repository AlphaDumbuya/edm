import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, HeartHandshake, Mail, ArrowLeft, Gift, HandCoins, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function IndividualPartnershipPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Partner as an Individual"
        subtitle="Join our mission in Sierra Leone & Oregon personally and make a direct impact."
        icon={User}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-3 md:space-y-4">
          <SectionTitle title="Your Personal Impact" />
          <p className="text-base sm:text-lg text-muted-foreground">
            Every individual has God-given talents that can contribute to the Kingdom in Sierra Leone or through our Oregon partnerships. At EDM, we value your unique ability to make a difference, whether through prayer, volunteering, advocacy, or financial support.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Discover how you can align your heart with our mission in these key regions and become an active participant in spreading the Gospel.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 relative">
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
      <SectionTitle title="Ways You Can Partner" subtitle="Explore opportunities in Sierra Leone & Oregon" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <HeartHandshake className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Prayer Partnership</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Commit to praying for our missionaries in Sierra Leone, projects in both regions, and the unreached. Join our prayer network for specific updates.
            </p>
            <div className="text-center mt-3">
                <Link href="/get-involved/prayer" legacyBehavior>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">Join Prayer Wall</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Gift className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Volunteer Your Skills</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Offer time and talents for Sierra Leone projects (local/remote) or assist Oregon-based support efforts. Skills like admin, design, or IT are valuable.
            </p>
             <div className="text-center mt-3">
                <Link href="/get-involved/volunteer" legacyBehavior>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">Volunteer Sign-up</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Volume2 className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Become an Ambassador</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Be a voice for EDM's work in Sierra Leone and our Oregon connections within your community. Share stories and opportunities for involvement.
            </p>
            <div className="text-center mt-3">
                <Link href="/get-involved/ambassador" legacyBehavior>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">Learn About Ambassadorship</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow lg:col-span-3 md:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <HandCoins className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Financial Giving</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Your financial contributions directly support our evangelism, discipleship, and mission projects in Sierra Leone, and our collaborative work with Oregon partners.
            </p>
            <div className="text-center">
              <Link href="/donate" legacyBehavior>
                <Button size="lg" className="text-sm sm:text-base">Donate Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <section className="text-center bg-card p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Ready to Make a Personal Impact?" className="text-center" />
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8">
          We're excited to explore how your passion and skills can align with EDM's mission in Sierra Leone or Oregon. If you have questions or want to discuss involvement, please reach out.
        </p>
        <Link
          href="/contact"
          legacyBehavior>
          <Button size="lg" className="text-sm sm:text-base">
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contact Us
          </Button>
        </Link>
      </section>
      <div className="text-center mt-8 md:mt-12">
        <Link href="/get-involved/partner" legacyBehavior>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm"><ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Back to Partnership Overview</Button>
        </Link>
      </div>
    </div>
  );
}
