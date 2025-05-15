
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import LeaderProfile from '@/components/about/leader-profile';
import { Users } from 'lucide-react';

const leaders = [
  {
    name: 'Rev. [Founder\'s Name]', // Placeholder - replace with actual founder's name
    role: 'Founder & Director, EDM Sierra Leone',
    bio: 'Driven by a divine burden for the church in Sierra Leone, Rev. [Founder\'s Name] established EDM to prioritize evangelism, create robust discipleship structures, and engage in impactful missions. His vision is to see Sierra Leone transformed by the Gospel.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'african pastor leader',
    contact: 'founder@edm.org', // Placeholder
  },
  {
    name: '[Ohio Partnership Lead Name]', // Placeholder
    role: 'Director, Ohio Partnerships & International Support',
    bio: 'Facilitates crucial support from US-based partners in Ohio, connecting resources, prayer, and collaborative efforts to empower EDM\'s work in Sierra Leone. Passionate about global missions and the unity of the Body of Christ.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'professional person office',
    contact: 'ohiopartners@edm.org', // Placeholder
  },
  {
    name: '[Head of Discipleship Name]', // Placeholder
    role: 'Head of Discipleship & Training, EDM Sierra Leone',
    bio: 'Oversees the development and implementation of discipleship programs in Sierra Leone, ensuring new believers are nurtured to maturity and equipped to train others, fulfilling Matthew 28:18-20.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'teacher africa classroom',
    contact: 'discipleship@edm.org', // Placeholder
  },
  {
    name: '[Missions Coordinator Name]', // Placeholder
    role: 'Missions & Outreach Coordinator, EDM Sierra Leone',
    bio: 'Leads EDM\'s mission projects and evangelistic outreaches across Sierra Leone, including coordinating the "Jesus" film showings and managing the development of the EDM campus.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'project manager africa',
    contact: 'missions@edm.org', // Placeholder
  },
];

export default function LeadershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Leadership Team"
        subtitle="Meet the dedicated individuals guiding EDM's mission of Evangelism, Discipleship, and Missions in Sierra Leone, supported by our Ohio partners."
        icon={Users}
      />

      <section>
        <SectionTitle title="Guiding Our Vision" subtitle="Committed individuals leading with faith and integrity to fulfill God's call for EDM." />
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {leaders.map((leader) => (
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
    </div>
  );
}
