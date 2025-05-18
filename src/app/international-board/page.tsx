
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import LeaderProfile from '@/components/about/leader-profile'; // Assuming this component is suitable
import { Users, Globe } from 'lucide-react'; // Users for people, Globe for international aspect

const boardMembers = [
  {
    name: 'Rev. Edwin Kargbo', // Updated founder's name
    role: 'Founder & Director, EDM Sierra Leone',
    bio: 'Driven by a divine burden for the church in Sierra Leone, Rev. Edwin Kargbo established EDM to prioritize evangelism, create robust discipleship structures, and engage in impactful missions. His vision is to see Sierra Leone transformed by the Gospel.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'african pastor leader',
    contact: 'edwin.kargbo@edm.org', // Placeholder
    location: 'Sierra Leone',
  },
  {
    name: '[Oregon Partnership Lead Name]', // Placeholder
    role: 'Director, Oregon Partnerships & International Support',
    bio: 'Based in Oregon, USA, this leader facilitates crucial support from US-based partners, connecting resources, prayer, and collaborative efforts to empower EDM\'s work in Sierra Leone. Passionate about global missions and the unity of the Body of Christ.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'professional person office',
    contact: 'oregonpartners@edm.org', // Placeholder
    location: 'Oregon, USA',
  },
  {
    name: '[International Advisor Name 1]', // Placeholder
    role: 'International Advisor & Board Member',
    bio: 'Brings extensive experience in non-profit governance and missions strategy to the EDM board, providing guidance and oversight for international operations and partnerships.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'board member professional',
    contact: 'advisor1@edm.org', // Placeholder
    location: 'International',
  },
   {
    name: '[International Advisor Name 2]', // Placeholder
    role: 'International Advisor - Finance & Stewardship',
    bio: 'Oversees financial integrity and stewardship practices for EDM internationally, ensuring resources are managed effectively for maximum kingdom impact.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'finance expert professional',
    contact: 'advisor.finance@edm.org', // Placeholder
    location: 'International',
  },
  // Add more board members as needed, distinguishing between Sierra Leone based and international/Oregon based.
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
              // You might want to add a 'location' prop to LeaderProfile if it's useful to display
            />
          ))}
        </div>
      </section>
       <section className="bg-card p-8 rounded-lg shadow-md">
        <SectionTitle title="Our Commitment to Governance" />
        <p className="text-muted-foreground">
          The EDM International Board is responsible for ensuring the ministry adheres to its mission, maintains financial integrity, and operates with ethical accountability in both Sierra Leone and its international partnerships, including those in Oregon. Board members are selected for their spiritual maturity, professional expertise, and commitment to the Great Commission.
        </p>
      </section>
    </div>
  );
}
