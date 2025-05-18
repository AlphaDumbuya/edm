
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, FileText, Percent, Users, BarChart3, Mail, Landmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const financialPrinciples = [
  {
    title: 'Responsible Stewardship',
    description: 'We are committed to using every donation wisely and efficiently to maximize its impact for God\'s Kingdom in Sierra Leone and through our Oregon partnerships.',
    icon: Landmark, 
  },
  {
    title: 'Accountability & Oversight',
    description: 'EDM operates under the diligent oversight of an independent Board of Directors. We conduct regular internal reviews and are committed to best practices in financial management.',
    icon: Users, 
  },
  {
    title: 'Clear Reporting',
    description: 'We believe in providing clear and accessible information about our financial activities, particularly concerning our work in Sierra Leone and collaborations with Oregon partners.',
    icon: FileText,
  },
  {
    title: 'Ethical Practices',
    description: 'All our financial dealings are conducted with the highest level of integrity, adhering to ethical standards and legal requirements for non-profit organizations in Sierra Leone.',
    icon: ShieldCheck,
  },
];

export default function FinancialTransparencyPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Financial Transparency"
        subtitle="Our Commitment to Accountability and Stewardship for work in Sierra Leone and Oregon"
        icon={ShieldCheck}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="Our Pledge to You" />
          <p className="text-lg text-muted-foreground">
            At EDM, we believe that financial transparency is a cornerstone of trust and faithful stewardship. We are deeply grateful for every gift entrusted to us for our work, primarily based in Sierra Leone with key partnerships in Oregon, USA. 
          </p>
          <p className="text-lg text-muted-foreground">
            EDM is a registered 501(c)(3) non-profit organization. This page outlines our policies and practices regarding the financial management of your generous contributions, ensuring they are used to advance our mission of evangelism, discipleship, and missions.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80"> {/* Added h-80 for consistent image height */}
          <Image
            src="https://placehold.co/600x400.png"
            alt="Financial documents related to Sierra Leone mission"
            layout="fill"
            objectFit="cover"
            data-ai-hint="financial integrity sierra leone"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Core Financial Principles" className="text-center" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {financialPrinciples.map((principle) => (
            <Card key={principle.title} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                  <principle.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="How Your Donations Are Utilized" />
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <p className="text-muted-foreground mb-4">
                    We strive to ensure that a significant majority of every donation goes directly to program services that fulfill our mission in Sierra Leone and support our Oregon partnerships. Our allocation model prioritizes:
                </p>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5 mb-6">
                    <li><strong>Sierra Leone Evangelism & Outreach:</strong> Funding for conferences in Freetown, mission trips within Sierra Leone, resource distribution, and local church support.</li>
                    <li><strong>Discipleship Programs (SL & OR):</strong> Developing materials, training leaders in Sierra Leone, and fostering discipleship networks with Oregon partners.</li>
                    <li><strong>Mission Support (Sierra Leone):</strong> Equipping and caring for our field missionaries and project teams in Sierra Leone.</li>
                    <li><strong>Community Development (Sierra Leone):</strong> Projects such as clean water initiatives, educational support, and healthcare assistance in Sierra Leonean communities.</li>
                    <li><strong>Administrative & Fundraising:</strong> Necessary operational costs for our Freetown HQ and Oregon coordination to support our ministry effectively and ensure sustainable growth. We work to keep these costs as low as possible.</li>
                </ul>
                <p className="text-muted-foreground">
                    A detailed breakdown of our fund allocation is provided in our annual financial reports.
                </p>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-sm p-6 border rounded-lg bg-background text-center">
                    <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground">Focused Impact Allocation</p>
                    <p className="text-sm text-muted-foreground">
                        (Illustrative: 85% Program Services for SL/OR, 10% Admin, 5% Fundraising)
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Actual figures in annual report.</p>
                </div>
            </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Access to Financial Information" />
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto text-center">
          EDM is committed to providing our partners with access to our financial information for our Sierra Leone operations and Oregon collaborations. We believe this transparency builds trust and demonstrates our accountability.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center"><FileText className="mr-2 h-6 w-6 text-primary" /> Annual Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our annual reports provide a comprehensive overview of our activities, impact, and financial performance for the preceding fiscal year, focusing on Sierra Leone and Oregon.
              </p>
              <Button variant="outline" disabled>
                View 2023 Annual Report (PDF - Coming Soon)
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center"><Mail className="mr-2 h-6 w-6 text-primary" /> Financial Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have specific questions about our finances or how donations are used for our Sierra Leone and Oregon work, please contact our finance department.
              </p>
              <Link href="mailto:finance@edm.org">
                <Button variant="default">Contact Finance Team</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
         <p className="text-sm text-muted-foreground mt-8 text-center">
            EDM is a registered 501(c)(3) non-profit organization in Sierra Leone. All financial information is managed in accordance with applicable laws and regulations.
        </p>
      </section>

      <section className="text-center py-8">
        <p className="text-lg text-muted-foreground mb-6">
          Your trust and partnership are invaluable to us. Thank you for supporting the mission of EDM in Sierra Leone and Oregon.
        </p>
        <Link href="/donate">
          <Button size="lg" variant="default">
            Support Our Mission
          </Button>
        </Link>
      </section>
    </div>
  );
}
