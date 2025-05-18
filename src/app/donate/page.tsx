
// src/app/donate/page.tsx
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import DonationFormWrapper from '@/components/donate/donation-form-wrapper';
import { Button } from '@/components/ui/button';
import { HelpingHand, Mail, Users, ArrowRight, Package, School, DollarSign, Heart, ShieldCheck, CreditCard, Mailbox, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DonatePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Support EDM's Mission"
        subtitle="Your generosity fuels Evangelism, Discipleship, and Missions in Sierra Leone, West Africa, and supports our Oregon partnerships."
        icon={HelpingHand}
      />

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-3 md:space-y-4">
          <SectionTitle title="Why Your Gift Matters" subtitle="Every contribution makes a difference" />
          <div className="text-base sm:text-lg text-muted-foreground space-y-3 md:space-y-4">
            <p>
              At Evangelism, Discipleship, Missions (EDM), we rely on the faithful support of partners like you to carry out our work in Sierra Leone. Your donations enable us to share the Gospel, train believers, support the EDM Marifa School, develop our planned campus (including a retreat center), and bring tangible hope to communities.
            </p>
            <p>
              EDM is a registered 501(c)(3) non-profit organization. We are committed to financial integrity and stewardship. We want to take this opportunity to thank all those who have generously contributed toward this venture. Your support helps us accomplish all that God has called us to do.
            </p>
            <p>
              Please consider donating one time, monthly, or quarterly to support EDM's ongoing mission and specific needs.
            </p>
          </div>
        </div>
        <div className="relative h-64 sm:h-72 md:h-80 w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://source.unsplash.com/random/800x600/?sierra,leone,children,community,hope"
            alt="Children in Sierra Leone benefiting from EDM's work"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone children community"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Current Needs & Updates" subtitle="Help us move forward with these critical EDM projects" />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Card className="shadow-md hover:shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <School className="h-7 w-7 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-lg sm:text-xl">Support EDM Marifa School</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-muted-foreground text-center mb-3">Our EDM Marifa Secondary School is now operational! Your support helps us provide quality education, share the Gospel, and foster Christian fellowship in the Marifa community and surrounding villages.</p>
               <Link href="/ministries/education/marifa-school" className="block text-center">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">Learn More & Support School</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Package className="h-7 w-7 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-lg sm:text-xl">Van & Ministry Equipment</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-muted-foreground text-center">A van and musical instruments have been shipped and are being prepared for ministry use. These are vital for our outreach and evangelism efforts across Sierra Leone. Support for fuel, maintenance, and future equipment needs is appreciated.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <SectionTitle title="Make a Secure Online Donation" subtitle="Empower our work in Sierra Leone and Oregon today" className="text-center" />
        <p className="text-center text-muted-foreground mb-6 text-sm sm:text-base">
          Your donation, whether one-time, monthly, or quarterly, directly supports EDM's evangelism, discipleship, missions activities, the operational EDM Marifa School, and our collaborative efforts with Oregon partners.
        </p>
        <DonationFormWrapper />
         <p className="text-xs text-muted-foreground mt-4 text-center">All donations are processed securely. EDM is a registered 501(c)(3) non-profit organization committed to financial transparency.</p>
      </section>

      <section id="more-support-options" className="bg-card p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="More Ways to Support EDM" subtitle="Beyond online donations" />
        <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 items-start">
          
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground border-b pb-2 flex items-center"><Mailbox className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary"/> Donate by Mail (Check)</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              If you prefer to donate by check, please make it payable to "Evangelism, Discipleship, Missions" and mail to our US address:
            </p>
            <address className="space-y-1 text-sm sm:text-base text-foreground font-medium bg-muted p-3 sm:p-4 rounded-md not-italic shadow-sm">
              <p>Evangelism, Discipleship, Missions</p>
              <p>12301 SE Stephens St.</p>
              <p>Portland, OR 97233</p>
              <p>USA</p>
            </address>
             <p className="text-sm sm:text-base text-muted-foreground">
                For donations to our Sierra Leone headquarters or other financial inquiries (stocks, planned giving), please contact us.
             </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">Contact for Other Giving <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4"/></Button>
              </Link>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground border-b pb-2 flex items-center"><CreditCard className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary"/> Donate by Zelle</h3>
             <p className="text-sm sm:text-base text-muted-foreground">
              You can also send donations via Zelle to:
            </p>
            <div className="bg-muted p-3 sm:p-4 rounded-md shadow-sm text-sm sm:text-base">
                <p className="text-foreground font-medium">Account Name: Evangelism, Discipleship, Missions</p>
                <p className="text-foreground font-medium">Email: <a href="mailto:edmsierraleone@gmail.com" className="text-primary hover:underline">edmsierraleone@gmail.com</a></p>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-foreground border-b pb-2 flex items-center pt-2 sm:pt-4"><ExternalLink className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary"/> Donate with PayPal</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              You can also support EDM's mission by donating via PayPal.
            </p>
            <div className="bg-muted p-3 sm:p-4 rounded-md shadow-sm">
                <p className="text-foreground font-medium text-sm sm:text-base">PayPal Email: <a href="mailto:your-paypal-email@edm.org" className="text-primary hover:underline">your-paypal-email@edm.org</a></p>
                <p className="text-xs text-muted-foreground mt-1">(Or provide a direct PayPal.Me link if you have one)</p>
                 <Button variant="link" asChild className="mt-1 sm:mt-2 px-0 text-xs sm:text-sm">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary">
                        Go to PayPal Donation Page <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4"/>
                    </a>
                </Button>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-foreground border-b pb-2 flex items-center pt-2 sm:pt-4"><Heart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary"/> Other Ways to Get Involved</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Financial gifts are vital, but there are many ways to support EDM's mission in Sierra Leone and Oregon. Consider volunteering your skills, joining our prayer network, or helping us spread the word.
            </p>
            <div className="space-y-2 sm:space-y-3">
                <Link href="/get-involved/volunteer">
                    <Button variant="outline" className="w-full justify-start text-xs sm:text-sm"><Users className="mr-2 h-4 w-4"/>Volunteer Opportunities</Button>
                </Link>
                <Link href="/get-involved/prayer">
                    <Button variant="outline" className="w-full justify-start text-xs sm:text-sm"><HelpingHand className="mr-2 h-4 w-4"/>Join Our Prayer Wall</Button>
                </Link>
                <Link href="/get-involved/partner">
                    <Button variant="outline" className="w-full justify-start text-xs sm:text-sm"><Users className="mr-2 h-4 w-4"/>Explore Partnerships</Button>
                </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-6 md:py-8">
        <div className="flex items-center justify-center text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-primary"/>
            <p>EDM is a registered 501(c)(3) non-profit organization. We are committed to stewarding all resources with integrity for the advancement of the Gospel.</p>
        </div>
        <Link href="/financial-transparency">
          <Button variant="link" className="text-primary text-xs sm:text-sm">
            View Our Financial Transparency Policy
          </Button>
        </Link>
      </section>
    </div>
  );
}

