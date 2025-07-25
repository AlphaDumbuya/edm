// src/app/donate/page.tsx
import SectionTitle from '@/components/shared/section-title';
import DonationFormWrapper from '@/components/donate/donation-form-wrapper';
import { Button } from '@/components/ui/button';
import { HelpingHand, Mail, Users, ArrowRight, Package, School, DollarSign, Heart, ShieldCheck, CreditCard, Mailbox, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PageHeader from '@/components/shared/page-header';

export default function DonatePage() {
  const payPalHostedButtonId = "QQJUCWAXAX3JE";
  const payPalClientId = "BAAtVyCFo0kWxiZ_FS5BS3QSNnnJ4VCn7sxndZ-UkJ6SiN2zhUFrTlswPBEppkaoUOpqaMKHGfBkw1tHWA";
  // Removed enable-funding=venmo from the PayPal script URL to prevent errors
  const payPalScriptUrl = `https://www.paypal.com/sdk/js?client-id=${payPalClientId}&components=hosted-buttons&currency=USD`;

  return (
    <div className="space-y-8 sm:space-y-12 md:space-y-16 px-2">
      <PageHeader
        title="Support EDM's Mission"
        subtitle="Your generosity fuels Evangelism, Discipleship, and Missions in Sierra Leone, West Africa, and supports our Oregon partnerships."
        icon={HelpingHand}
      />
      <section className="flex flex-col gap-6 sm:grid md:grid-cols-2 md:gap-12 items-center">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <SectionTitle title="Why Your Gift Matters" subtitle="Every contribution makes a difference" />
          <div className="text-sm sm:text-base md:text-lg text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4">
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
        <div className="relative h-48 sm:h-64 md:h-80 w-full max-w-xs sm:max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661962927450-d5f7c9267ca2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2l2aW5nfGVufDB8fDB8fHww"
            alt="Children in Sierra Leone benefiting from EDM's work"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>
      <section>
        <SectionTitle title="Current Needs & Updates" subtitle="Help us move forward with these critical EDM projects" />
        <div className="flex flex-col gap-4 sm:grid md:grid-cols-1 lg:grid-cols-2 sm:gap-6 md:gap-8">
          <Card className="shadow-md hover:shadow-lg">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <School className="h-7 w-7 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-base sm:text-lg md:text-xl">Support EDM Marifa School</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center mb-2">Our EDM Marifa Secondary School is now operational! Your support helps us provide quality education, share the Gospel, and foster Christian fellowship in the Marifa community and surrounding villages.</p>
              <Button variant="outline" size="sm" className="text-[11px] sm:text-xs md:text-sm" asChild>
                <Link href="/ministries/education/marifa-school">Learn More & Support School</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Package className="h-7 w-7 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-base sm:text-lg md:text-xl">Van & Ministry Equipment</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center">A van and musical instruments have been shipped and are being prepared for ministry use. These are vital for our outreach and evangelism efforts across Sierra Leone. Support for fuel, maintenance, and future equipment needs is appreciated.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="max-w-full sm:max-w-2xl mx-auto px-1">
        <SectionTitle title="Make a Secure Online Donation" subtitle="Empower our work in Sierra Leone and Oregon today" className="text-center" />
        <p className="text-center text-muted-foreground mb-4 text-xs sm:text-sm md:text-base">
          Your donation, whether one-time, monthly, or quarterly, directly supports EDM's evangelism, discipleship, missions activities, the operational EDM Marifa School, and our collaborative efforts with Oregon partners.
        </p>
        <DonationFormWrapper />
        <p className="text-[10px] text-muted-foreground mt-3 text-center">All donations are processed securely. EDM is a registered 501(c)(3) non-profit organization committed to financial transparency.</p>
      </section>
      <section id="more-support-options" className="bg-card p-3 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="More Ways to Support EDM" subtitle="Beyond credit card donations" />

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground border-b pb-2 flex items-center">
              <CreditCard className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" /> Donate with PayPal
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4">You can also support EDM's mission by donating via PayPal.</p>
            <div className="flex justify-center sm:justify-start">
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=3P7G7PYAUF96N" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 
                  px-4 sm:px-6 
                  py-2.5 sm:py-3 
                  text-xs sm:text-sm md:text-base 
                  font-semibold text-white 
                  bg-[#0070ba] hover:bg-[#003087] 
                  rounded-md 
                  transition-all duration-200
                  shadow-md hover:shadow-lg 
                  w-[90%] sm:w-auto
                  hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.067 8.478c.492.315.844.827.983 1.481.157.736.132 1.404-.161 2.041-.294.637-.796 1.154-1.485 1.551-.764.44-1.713.656-2.847.656h-2.72l-.641 3.997h-2.084l.641-3.997H9.014l-.641 3.997H6.289l1.923-12h7.759c1.163 0 2.009.227 2.535.682.526.455.79 1.068.79 1.839 0 .819-.265 1.539-.795 2.159-.53.62-1.256 1.029-2.179 1.224.857.032 1.523.226 1.996.583zm-6.562-3.997h-2.359l-.682 4.258h2.359c.935 0 1.661-.174 2.179-.521.518-.347.777-.832.777-1.454 0-.566-.185-1.004-.554-1.314-.37-.31-.917-.466-1.642-.466l.002-.503z"/>
                </svg>
                <span className="whitespace-nowrap">Donate with PayPal</span>
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-0.5 sm:ml-1 flex-shrink-0" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground border-b pb-2 flex items-center pt-3 sm:pt-4">
              <Mailbox className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" /> Donate by Mail (Check)
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">If you prefer to donate by check, please make it payable to "Evangelism, Discipleship, Missions" and mail to our US address:</p>
            <address className="space-y-1 text-[11px] sm:text-sm md:text-base text-foreground font-medium bg-muted p-2 sm:p-4 rounded-md not-italic shadow-sm">
              <p>Evangelism, Discipleship, Missions</p>
              <p>12301 SE Stephens St.</p>
              <p>Portland, OR 97233</p>
              <p>USA</p>
            </address>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">For donations to our Sierra Leone headquarters or other financial inquiries (stocks, planned giving), please contact us.</p>
            <Button variant="outline" className="w-full sm:w-auto text-[11px] sm:text-xs md:text-sm" asChild>
              <Link href="/contact">Contact for Other Giving <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" /></Link>
            </Button>
          </div>

          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground border-b pb-2 flex items-center pt-3 sm:pt-4">
              <Heart className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" /> Other Ways to Get Involved
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Financial gifts are vital, but there are many ways to support EDM's mission in Sierra Leone and Oregon. Consider volunteering your skills, joining our prayer network, or helping us spread the word.</p>
            <div className="space-y-2 sm:space-y-3">
              <Button variant="outline" className="w-full justify-start text-[11px] sm:text-xs md:text-sm" asChild>
                <Link href="/get-involved/volunteer"><Users className="mr-2 h-4 w-4" />Volunteer Opportunities</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-[11px] sm:text-xs md:text-sm" asChild>
                <Link href="/get-involved/prayer"><HelpingHand className="mr-2 h-4 w-4" />Join Our Prayer Wall</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-[11px] sm:text-xs md:text-sm" asChild>
                <Link href="/get-involved/partner"><Users className="mr-2 h-4 w-4" />Explore Partnerships</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center py-4 sm:py-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center text-muted-foreground mb-2 sm:mb-3 sm:mb-4 text-[10px] sm:text-xs md:text-sm">
          <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-1.5 sm:mr-2 text-primary" />
          <p>EDM is a registered 501(c)(3) non-profit organization. We are committed to stewarding all resources with integrity for the advancement of the Gospel.</p>
        </div>
        <Button variant="link" className="text-primary text-[11px] sm:text-xs md:text-sm" asChild>
          <Link href="/financial-transparency">View Our Financial Transparency Policy</Link>
        </Button>
      </section>
    </div>
  );
}
