
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
    name: '[Oregon Partnership Lead Name]',
    role: 'Director, Oregon Partnerships & International Support',
    bio: 'Based in Oregon, USA, this leader facilitates crucial support from US-based partners, connecting resources, prayer, and collaborative efforts to empower EDM\'s work in Sierra Leone. Passionate about global missions and the unity of the Body of Christ.',
    imageUrl: 'https://source.unsplash.com/random/300x300/?professional,person,office,meeting',
    dataAiHint: 'professional person office',
    contact: 'oregonpartners@edm.org',
    location: 'Oregon, USA',
  },
  {
    name: '[International Advisor Name 1]',
    role: 'International Advisor & Board Member',
    bio: 'Brings extensive experience in non-profit governance and missions strategy to the EDM board, providing guidance and oversight for international operations and partnerships.',
    imageUrl: 'https://source.unsplash.com/random/300x300/?board,member,meeting',
    dataAiHint: 'board member professional',
    contact: 'advisor1@edm.org',
    location: 'International',
  },
   {
    name: '[International Advisor Name 2]',
    role: 'International Advisor - Finance & Stewardship',
    bio: 'Oversees financial integrity and stewardship practices for EDM internationally, ensuring resources are managed effectively for maximum kingdom impact.',
    imageUrl: 'https://source.unsplash.com/random/300x300/?finance,expert,desk',
    dataAiHint: 'finance expert professional',
    contact: 'advisor.finance@edm.org',
    location: 'International',
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
