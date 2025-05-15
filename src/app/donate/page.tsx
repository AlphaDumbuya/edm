
// src/app/donate/page.tsx
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import DonationFormWrapper from '@/components/donate/donation-form-wrapper';
import { Button } from '@/components/ui/button';
import { HelpingHand, Mail, Phone, Users, ArrowRight, Info, Package, LandPlot, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DonatePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Support EDM's Mission"
        subtitle="Your generosity fuels Evangelism, Discipleship, and Missions in Sierra Leone, West Africa."
        icon={HelpingHand}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Why Your Gift Matters to EDM" subtitle="Every contribution makes a difference in Sierra Leone" />
          <div className="text-lg text-muted-foreground space-y-4">
            <p>
              At EDM, we rely on the faithful support of partners like you to carry out our work of evangelism, discipleship, and missions in Sierra Leone. Your donations enable us to share the Gospel, train believers, develop our planned campus (school, retreat center), and bring tangible hope to communities.
            </p>
            <p>
              We are committed to financial integrity and stewardship. We want to take this opportunity to thank all those who have generously contributed toward this venture. Your support helps us accomplish all that God has called us to do.
            </p>
          </div>
        </div>
        <div className="relative h-64 md:h-80 w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://placehold.co/800x600.png"
            alt="EDM impacting lives in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone children community help"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Current Needs &amp; Updates" subtitle="Help us move forward with these critical EDM projects" />
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <LandPlot className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Land Acquired & School Construction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">We have acquired land to build a school and a retreat center for the Body of Christ. Your support helps us finalize land documentation and begin school construction.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">Van & Equipment Arrival</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">A van and musical instruments were shipped in August and are due to arrive the first week of October. These are vital for our outreach and evangelism efforts.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg bg-destructive/10 border-destructive">
            <CardHeader>
              <div className="mx-auto bg-destructive/20 p-3 rounded-full w-fit mb-3">
                <DollarSign className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-center text-destructive">Urgent: Customs Clearance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground text-center">There is an outstanding balance of <strong>$3,500.00</strong> to pay customs in Freetown for the van and equipment. Your immediate contribution can help us clear these essential items.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <SectionTitle title="Make a Secure Donation to EDM" subtitle="Empower our work in Sierra Leone today" className="text-center" />
        <p className="text-center text-muted-foreground mb-4">
          Please consider donating one time, monthly, or quarterly to support EDM's ongoing mission and specific needs. Every gift helps us share the Gospel, disciple believers, and build our ministry campus.
        </p>
        <DonationFormWrapper />
      </section>

      <section id="more-support-options" className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="More Ways to Support EDM" />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
          {/* Column 1: Direct Giving */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground border-b pb-2">Direct Giving to EDM Sierra Leone HQ</h3>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                <Mail className="mr-3 h-6 w-6 text-primary"/> Donate by Mail
              </h4>
              <p className="text-muted-foreground mb-2">
                If you prefer to donate by check, please make it payable to "EDM" and mail to our headquarters:
              </p>
              <address className="space-y-1 text-foreground font-medium bg-muted p-3 rounded-md not-italic">
                <p>EDM</p>
                <p>66 Main Grafton Road</p>
                <p>Kossoh Town, Freetown</p>
                <p>Sierra Leone</p>
              </address>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                <Phone className="mr-3 h-6 w-6 text-primary"/> Other Financial Inquiries
              </h4>
              <p className="text-muted-foreground mb-2">
                For questions about stock donations, planned giving, or other types of financial contributions to EDM, please contact us:
              </p>
              <p className="text-foreground">Email: <a href="mailto:finance@edm.org" className="text-primary hover:underline">finance@edm.org</a></p>
              <p className="text-foreground">Phone: <a href="tel:+23200000000" className="text-primary hover:underline">(+232) XX-XXX-XXX (SL)</a></p>
            </div>
          </div>

          {/* Column 2: Partnership Opportunities */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground border-b pb-2">Become an EDM Partner</h3>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                <Users className="mr-3 h-6 w-6 text-primary"/> Partnership with EDM
              </h4>
              <p className="text-muted-foreground mb-4">
                Your collaboration can amplify our impact in Sierra Leone and with our Ohio partners. We offer various ways for individuals, churches, and organizations to partner with EDM in fulfilling the Great Commission. Discover how you can join forces with us.
              </p>
              <Link href="/partnership">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore EDM Partnerships <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
             <div className="mt-8">
                <h4 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                    <Info className="mr-3 h-6 w-6 text-primary"/> General Support & Prayer
                </h4>
                <p className="text-muted-foreground">
                    Beyond financial contributions, your prayers, advocacy, and willingness to share EDM's story are invaluable. Learn more about how you can be involved in non-monetary ways through our partnership opportunities and prayer wall.
                </p>
                 <Link href="/prayer" className="mt-2 inline-block">
                    <Button variant="link">Join our Prayer Wall</Button>
                </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          EDM is a registered Christian non-profit organization in Sierra Leone. Donations are managed with integrity.
        </p>
        <Link href="/financial-transparency">
          <Button variant="link" className="text-primary">
            View Our Financial Transparency Policy
          </Button>
        </Link>
      </section>
    </div>
  );
}
