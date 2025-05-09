// src/app/donate/page.tsx
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import DonationFormWrapper from '@/components/donate/donation-form-wrapper';
import { Button } from '@/components/ui/button';
import { HelpingHand, Mail, Phone, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DonatePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Support Our Mission"
        subtitle="Your generosity fuels our efforts to share the Gospel and transform lives in Sierra Leone and through our Ohio partnerships."
        icon={HelpingHand}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Why Your Gift Matters" subtitle="Every contribution makes a difference" />
          <div className="text-lg text-muted-foreground space-y-4">
            <p>
              At EDM, we rely on the faithful support of partners like you to carry out our work of evangelism, discipleship, and missions, primarily focused in Sierra Leone with collaborative efforts in Ohio. Your donations enable us to send missionaries, provide resources for communities in Sierra Leone, run local programs, and bring hope to those in need.
            </p>
            <p>
              We are committed to financial integrity and stewardship, ensuring that your gifts are used effectively to maximize impact for God's Kingdom in these regions.
            </p>
          </div>
        </div>
        <div className="relative h-64 md:h-80 w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/donatesl/800/600"
            alt="Impact of donation in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone children smiling community"
          />
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <SectionTitle title="Make a Secure Donation" subtitle="Empower our work in Sierra Leone & Ohio today" className="text-center" />
        <DonationFormWrapper />
      </section>

      <section id="more-support-options" className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="More Ways to Support EDM" />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
          {/* Column 1: Direct Giving */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground border-b pb-2">Direct Giving to Sierra Leone HQ</h3>
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
                For questions about stock donations, planned giving, or other types of financial contributions, please contact our finance department:
              </p>
              <p className="text-foreground">Email: <a href="mailto:finance@edm.org" className="text-primary hover:underline">finance@edm.org</a></p>
              <p className="text-foreground">Phone: <a href="tel:123-456-7891" className="text-primary hover:underline">(+232) XX-XXX-XXX (SL)</a></p>
            </div>
          </div>

          {/* Column 2: Partnership Opportunities */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground border-b pb-2">Become a Partner</h3>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                <Users className="mr-3 h-6 w-6 text-primary"/> Partnership Opportunities
              </h4>
              <p className="text-muted-foreground mb-4">
                Your collaboration can amplify our impact in Sierra Leone and Ohio. We offer various ways for individuals, churches, and organizations to partner with us in fulfilling the Great Commission. Discover how you can join forces with EDM.
              </p>
              <Link href="/partnership">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Partnerships <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          EDM is a registered non-profit organization in Sierra Leone. Donations are managed with integrity.
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

