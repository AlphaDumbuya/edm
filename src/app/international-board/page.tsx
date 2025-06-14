
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import LeaderProfile from '@/components/about/leader-profile';
import { Users, Globe } from 'lucide-react';

const boardMembers = [
  {
    name: 'Edwin Kargbo',
    role: 'Founder & Director, EDM Sierra Leone',
    bio: 'Driven by a divine burden for the church in Sierra Leone, Edwin Kargbo established EDM to prioritize evangelism, create robust discipleship structures, and engage in impactful missions. His vision is to see Sierra Leone transformed by the Gospel.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/edwin-kargbo.png',
    dataAiHint: 'Edwin Kargbo founder EDM',
    contact: 'edwin.kargbo@edm.org',
    location: 'Sierra Leone',
  },
  {
    name: 'Michael Kargo',
    role: 'Financial Secretary - Freetown',
    bio: 'Serving EDM as the Financial Secretary based in Freetown, ensuring diligent stewardship of resources to support the ministry\'s operations and outreach in Sierra Leone.',
    imageUrl: 'https://source.unsplash.com/random/300x300/?professional,person,office,meeting',
    dataAiHint: 'professional person office',
    contact: 'michael.kargo@edm.org', // Placeholder contact
    location: 'Freetown, Sierra Leone',
  },
  {
    name: 'Daniel Musa Sewa',
    role: 'Deputy Regional Coordinator for the North',
    bio: 'Supporting regional coordination efforts for EDM in the Northern Region of Sierra Leone, assisting in overseeing ministry activities and local initiatives.',
    imageUrl: 'https://source.unsplash.com/random/300x300/?board,member,meeting',
    dataAiHint: 'board member professional',
    contact: 'daniel.sewa@edm.org', // Placeholder contact
    location: 'Northern Region, Sierra Leone',
  },
   {
    name: 'Andrew Challey',
    role: 'Secretary to the Executive',
    bio: 'Providing essential administrative support and serving as Secretary to the Executive leadership of EDM.',
    imageUrl: 'https://source.unsplash.com/random/300x300/?finance,expert,desk',
    dataAiHint: 'finance expert professional',
    contact: 'andrew.challey@edm.org', // Placeholder contact
    location: 'Sierra Leone', // Or specify a region if known
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
        <SectionTitle title="Guiding Our Global Vision" subtitle="Committed leaders serving EDM's mission with faith, integrity, and international perspective." />
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
