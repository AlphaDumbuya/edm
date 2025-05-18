
// src/app/donate/page.tsx
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import DonationFormWrapper from '@/components/donate/donation-form-wrapper';
import { Button } from '@/components/ui/button';
import { HelpingHand, Mail, Phone, Users, ArrowRight, Info, Package, LandPlot, DollarSign, CheckCircle, Heart, ShieldCheck, CreditCard, Mailbox, School, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DonatePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Support EDM's Mission"
        subtitle="Your generosity fuels Evangelism, Discipleship, and Missions in Sierra Leone, West Africa, and supports our Oregon partnerships."
        icon={HelpingHand}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Why Your Gift Matters to EDM" subtitle="Every contribution makes a difference" />
          <div className="text-lg text-muted-foreground space-y-4">
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
        <div className="relative h-64 md:h-80 w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://source.unsplash.com/random/800x600/?sierra,leone,children,community"
            alt="Children in Sierra Leone benefiting from EDM's work"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone children community"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Current Needs & Updates" subtitle="Help us move forward with these critical EDM projects in Sierra Leone" />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"> {/* Changed to 2 columns for better balance */}
          <Card className="shadow-md hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <School className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Support EDM Marifa School</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center mb-3">Our EDM Marifa Secondary School is now operational! Your support helps us provide quality education, share the Gospel, and foster Christian fellowship in the Marifa community and surrounding villages.</p>
               <Link href="/ministries/education/marifa-school" className="block text-center">
                <Button variant="outline" size="sm">Learn More & Support School</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Van & Equipment Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">A van and musical instruments have been shipped and are expected to arrive soon. These are vital for our outreach and evangelism efforts across Sierra Leone. Support for fuel, maintenance, and future equipment needs is appreciated.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <SectionTitle title="Make a Secure Online Donation" subtitle="Empower our work in Sierra Leone and Oregon today" className="text-center" />
        <p className="text-center text-muted-foreground mb-6">
          Your donation, whether one-time, monthly, or quarterly, directly supports EDM's evangelism, discipleship, missions activities, the operational EDM Marifa School, and our collaborative efforts with Oregon partners.
        </p>
        <DonationFormWrapper />
         <p className="text-xs text-muted-foreground mt-4 text-center">All donations are processed securely. EDM is a registered 501(c)(3) non-profit organization committed to financial transparency.</p>
      </section>

      <section id="more-support-options" className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="More Ways to Support EDM" subtitle="Beyond online donations" />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2 flex items-center"><Mailbox className="mr-3 h-6 w-6 text-primary"/> Donate by Mail (Check)</h3>
            <p className="text-muted-foreground">
              If you prefer to donate by check, please make it payable to "Evangelism, Discipleship, Missions" and mail to our US address:
            </p>
            <address className="space-y-1 text-foreground font-medium bg-muted p-4 rounded-md not-italic shadow-sm">
              <p>Evangelism, Discipleship, Missions</p>
              <p>12301 SE Stephens St.</p>
              <p>Portland, OR 97233</p>
              <p>USA</p>
            </address>
             <p className="text-muted-foreground">
                For donations to our Sierra Leone headquarters or other financial inquiries (stocks, planned giving), please contact us.
             </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto">Contact for Other Giving <ArrowRight className="ml-2 h-4 w-4"/></Button>
              </Link>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2 flex items-center"><CreditCard className="mr-3 h-6 w-6 text-primary"/> Donate by Zelle</h3>
             <p className="text-muted-foreground">
              You can also send donations via Zelle to:
            </p>
            <div className="bg-muted p-4 rounded-md shadow-sm">
                <p className="text-foreground font-medium">Account Name: Evangelism, Discipleship, Missions</p>
                <p className="text-foreground font-medium">Email: <a href="mailto:edmsierraleone@gmail.com" className="text-primary hover:underline">edmsierraleone@gmail.com</a></p>
            </div>

            <h3 className="text-xl font-semibold text-foreground border-b pb-2 flex items-center pt-4"><ExternalLink className="mr-3 h-6 w-6 text-primary"/> Donate with PayPal</h3>
            <p className="text-muted-foreground">
              You can also support EDM's mission by donating via PayPal.
            </p>
            <div className="bg-muted p-4 rounded-md shadow-sm">
                <p className="text-foreground font-medium">PayPal Email: <a href="mailto:your-paypal-email@edm.org" className="text-primary hover:underline">your-paypal-email@edm.org</a></p>
                <p className="text-xs text-muted-foreground mt-1">(Or provide a direct PayPal.Me link if you have one)</p>
                 <Button variant="link" asChild className="mt-2 px-0">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary">
                        Go to PayPal Donation Page <ArrowRight className="ml-1 h-4 w-4"/>
                    </a>
                </Button>
            </div>

            <h3 className="text-xl font-semibold text-foreground border-b pb-2 flex items-center pt-4"><Heart className="mr-3 h-6 w-6 text-primary"/> Other Ways to Get Involved</h3>
            <p className="text-muted-foreground">
              Financial gifts are vital, but there are many ways to support EDM's mission in Sierra Leone and Oregon. Consider volunteering your skills, joining our prayer network, or helping us spread the word.
            </p>
            <div className="space-y-3">
                <Link href="/get-involved/volunteer">
                    <Button variant="outline" className="w-full justify-start"><Users className="mr-2"/>Volunteer Opportunities</Button>
                </Link>
                <Link href="/get-involved/prayer">
                    <Button variant="outline" className="w-full justify-start"><HelpingHand className="mr-2"/>Join Our Prayer Wall</Button>
                </Link>
                <Link href="/get-involved/partner">
                    <Button variant="outline" className="w-full justify-start"><Users className="mr-2"/>Explore Partnerships</Button>
                </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-8">
        <div className="flex items-center justify-center text-muted-foreground mb-4">
            <ShieldCheck className="h-5 w-5 mr-2 text-primary"/>
            <p>EDM is a registered 501(c)(3) non-profit organization. We are committed to stewarding all resources with integrity for the advancement of the Gospel.</p>
        </div>
        <Link href="/financial-transparency">
          <Button variant="link" className="text-primary">
            View Our Financial Transparency Policy
          </Button>
        </Link>
      </section>
    </div>
  );
}
