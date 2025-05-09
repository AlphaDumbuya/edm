import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import DonationOption from '@/components/donate/donation-option';
import { Button } from '@/components/ui/button';
import { HelpingHand, CreditCard, Gift, Mail, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const donationOptions = [
  {
    title: 'One-Time Gift',
    description: 'Make a single, impactful donation to support our ongoing mission activities.',
    icon: CreditCard,
    actionText: 'Donate Now',
    actionLink: '#', // Placeholder for payment gateway link
  },
  {
    title: 'Monthly Partnership',
    description: 'Become a regular supporter and help provide sustained funding for long-term projects.',
    icon: Users,
    actionText: 'Become a Partner',
    actionLink: '#',
  },
  {
    title: 'Sponsor a Missionary',
    description: 'Directly support one of our missionaries serving on the front lines.',
    icon: Gift,
    actionText: 'Sponsor Now',
    actionLink: '#',
  },
  {
    title: 'Donate by Mail',
    description: 'Prefer to send a check? Find our mailing address and instructions here.',
    icon: Mail,
    actionText: 'Get Details',
    actionLink: '#mail-details', // Link to a section on the page or a modal
  },
];

export default function DonatePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Support Our Mission"
        subtitle="Your generosity fuels our efforts to share the Gospel and transform lives."
        icon={HelpingHand}
      />

      <section className="text-center">
        <SectionTitle title="Why Your Gift Matters" subtitle="Every contribution makes a difference" className="text-center"/>
        <div className="max-w-3xl mx-auto text-lg text-muted-foreground space-y-4">
          <p>
            At EDM, we rely on the faithful support of partners like you to carry out our work of evangelism, discipleship, and missions. Your donations enable us to send missionaries, provide resources, run community programs, and bring hope to those in need.
          </p>
          <p>
            We are committed to financial integrity and stewardship, ensuring that your gifts are used effectively to maximize impact for God's Kingdom.
          </p>
        </div>
         <div className="mt-8 relative h-64 w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="https://picsum.photos/seed/donateimpact/800/400" 
              alt="Impact of donation"
              layout="fill"
              objectFit="cover"
              data-ai-hint="children smiling community"
            />
          </div>
      </section>

      <section>
        <SectionTitle title="Ways to Give" subtitle="Choose the method that works best for you" />
        <div className="grid md:grid-cols-2 gap-8">
          {donationOptions.map(option => (
            <DonationOption
              key={option.title}
              title={option.title}
              description={option.description}
              icon={option.icon}
              actionText={option.actionText}
              actionLink={option.actionLink}
            />
          ))}
        </div>
      </section>

      <section id="mail-details" className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Donate by Mail or Other Means" />
        <p className="text-muted-foreground mb-4">
          If you prefer to donate by check or have questions about other ways to give (such as stock donations or planned giving), please find our details below or contact us.
        </p>
        <div className="space-y-2 text-foreground">
          <p><strong>Mailing Address for Checks:</strong></p>
          <p>EDM<br />123 Mission Lane<br />Faith City, FC 54321</p>
          <p className="mt-4"><strong>For other inquiries, please contact our finance department:</strong></p>
          <p>Email: finance@edm.org</p> {/* Assuming email domain changes */}
          <p>Phone: (123) 456-7891</p>
        </div>
      </section>

      <section className="text-center">
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
