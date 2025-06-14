import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import LeaderProfile from '@/components/about/leader-profile';
import { Users, Globe } from 'lucide-react';

const boardMembers = [
  {
    name: 'Edwin Kargbo',
    role: 'Founder & Director, EDM Sierra Leone',
    bio: 'Driven by a divine burden for the church in Sierra Leone, this leader established EDM to prioritize evangelism, create robust discipleship structures, and engage in impactful missions. The vision is to see Sierra Leone transformed by the Gospel.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/edwin-kargbo.png',
    dataAiHint: 'Edwin Kargbo founder EDM',
    contact: 'edwin.kargbo@edm.org',
    location: 'Sierra Leone',
  },
  {
    name: 'Michael Kargo',
    role: 'Financial Secretary - Freetown',
    bio: "Serving EDM as the Financial Secretary based in Freetown, ensuring diligent stewardship of resources to support the ministry's operations and outreach in Sierra Leone.",
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/michael.png',
    dataAiHint: 'Michael Kargo Financial Secretary',
    contact: 'michael.kargo@edm.org',
    location: 'Freetown, Sierra Leone',
  },
  {
    name: 'Daniel Musa Sewa',
    role: 'Deputy Regional Coordinator for the North', // Corrected role capitalization
    bio: 'Supporting regional coordination efforts in the Northern Region of Sierra Leone, with responsibility for overseeing ministry activities and advancing local initiatives.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/daniel.png',
    dataAiHint: 'Daniel Musa Sewa Deputy Regional Coordinator', // Corrected dataAiHint
    contact: 'daniel.sewa@edm.org',
    location: 'Freetown, Sierra Leone',
  },
  {
    name: 'Andrew Challey',
    role: 'Secretary to the Executive', // Corrected role capitalization
    bio: 'Provides essential administrative support and serves as the central point of communication for the Executive leadership of EDM.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/andrew.png',
    dataAiHint: 'finance expert professional',
    contact: 'andrew.challey@edm.org',
    location: 'Sierra Leone',
  },
  {
    name: 'Samuel Tarawally',
    role: 'Administrator', // Corrected role capitalization
    bio: 'Oversees administrative operations with a focus on organizational efficiency, ensuring smooth communication and logistical support across ministry teams.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/tarawalley.png', // Corrected image URL
    dataAiHint: 'Samuel Tarawally Administrator',
    contact: 'Starawally@yahoo.uk',
    location: 'Sierra Leone',
  },

  {
    name: 'Daniel Fornah', // Corrected name capitalization
    role: 'EDM Northern Coordinator', // Corrected role capitalization
    bio: 'Leads regional ministry initiatives in the North, coordinating local leaders and fostering partnerships to expand the Gospel’s impact across the region.', // Corrected bio capitalization and punctuation
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/daniel-fornah.png', // Corrected image URL
    dataAiHint: 'Daniel Fornah EDM Northern Coordinator',
    contact: 'daniel.fornah@edm.org',
    location: 'Northern Region, Sierra Leone',
  },
];

export default function InternationalBoardPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM International Board & Leadership"
        subtitle="Meet the dedicated individuals providing strategic oversight and guidance for EDM's mission in Sierra Leone and our international partnerships, including those in Oregon, USA."
        icon={Globe}
      />

      <section>
        <SectionTitle
          title="Guiding Our Global Vision"
          subtitle="Committed leaders serving EDM's mission with faith, integrity, and international perspective."
        />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {boardMembers.map((leader) => (
            <LeaderProfile
              key={leader.name}
              name={leader.name}
              role={leader.role}
              bio={leader.bio}
              imageUrl={leader.imageUrl}
              dataAiHint={leader.dataAiHint}
              contact={leader.contact}
            />
          ))}
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-lg shadow-md">
        <SectionTitle title="Our Commitment to Governance" />
        <p className="text-muted-foreground">
          The EDM International Board is responsible for ensuring the ministry adheres to its mission, maintains financial integrity, and operates with ethical accountability in both Sierra Leone and its international partnerships, including those in Oregon. Board members are selected for their spiritual maturity, professional expertise, and commitment to the Great Commission.
        </p>
      </section>
    </div>
  );
}
