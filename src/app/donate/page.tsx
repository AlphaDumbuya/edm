// src/app/donate/page.tsx
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import DonationFormWrapper from '@/components/donate/donation-form-wrapper';
import { Button } from '@/components/ui/button';
import { HelpingHand, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DonatePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Support Our Mission"
        subtitle="Your generosity fuels our efforts to share the Gospel and transform lives."
        icon={HelpingHand}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Why Your Gift Matters" subtitle="Every contribution makes a difference" />
          <div className="text-lg text-muted-foreground space-y-4">
            <p>
              At EDM, we rely on the faithful support of partners like you to carry out our work of evangelism, discipleship, and missions. Your donations enable us to send missionaries, provide resources, run community programs, and bring hope to those in need.
            </p>
            <p>
              We are committed to financial integrity and stewardship, ensuring that your gifts are used effectively to maximize impact for God's Kingdom.
            </p>
          </div>
        </div>
        <div className="relative h-64 md:h-80 w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/donateimpact/800/600"
            alt="Impact of donation"
            layout="fill"
            objectFit="cover"
            data-ai-hint="children smiling community"
          />
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <SectionTitle title="Make a Secure Donation" subtitle="Empower our work today" className="text-center" />
        <DonationFormWrapper />
      </section>

      <section id="mail-details" className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Other Ways to Give" icon={Mail} />
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Donate by Mail</h3>
                <p className="text-muted-foreground mb-4">
                If you prefer to donate by check, please make it payable to "EDM" and mail to:
                </p>
                <div className="space-y-1 text-foreground font-medium">
                <p>EDM</p>
                <p>123 Mission Lane</p>
                <p>Faith City, FC 54321</p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Other Inquiries</h3>
                 <p className="text-muted-foreground mb-4">
                For questions about stock donations, planned giving, or other ways to support our mission, please contact our finance department:
                </p>
                <p className="text-foreground">Email: <a href="mailto:finance@edm.org" className="text-primary hover:underline">finance@edm.org</a></p>
                <p className="text-foreground">Phone: <a href="tel:123-456-7891" className="text-primary hover:underline">(123) 456-7891</a></p>
            </div>
        </div>
      </section>

      <section className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          EDM is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law.
        </p>
        <Link href="/financial-transparency"> {/* Placeholder link */}
          <Button variant="link" className="text-primary">
            View Our Financial Transparency Policy
          </Button>
        </Link>
      </section>
    </div>
  );
}
