import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import LeaderProfile from '@/components/about/leader-profile';
import { Users } from 'lucide-react';

const leaders = [
  {
    name: 'Dr. Evelyn Reed',
    role: 'President & CEO',
    bio: 'Dr. Reed has over 20 years of experience in global missions and leadership. Her passion is to see communities transformed by the Gospel.',
    imageUrl: 'https://picsum.photos/seed/leader1/300/300',
    dataAiHint: 'professional woman portrait',
    contact: 'ereed@edm.org', // Assuming email domain might also change if it was based on "edmconnect"
  },
  {
    name: 'Pastor Samuel Green',
    role: 'Vice President, Evangelism',
    bio: 'Pastor Green is a dynamic speaker and evangelist, dedicated to sharing God\'s love and training others to do the same.',
    imageUrl: 'https://picsum.photos/seed/leader2/300/300',
    dataAiHint: 'smiling man portrait',
    contact: 'sgreen@edm.org',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Director of Discipleship',
    bio: 'Maria has a heart for mentoring and equipping believers to grow deep in their faith. She develops resources and training programs.',
    imageUrl: 'https://picsum.photos/seed/leader3/300/300',
    dataAiHint: 'woman teaching group',
    contact: 'mrodriguez@edm.org',
  },
  {
    name: 'David Chen',
    role: 'Director of Missions Operations',
    bio: 'David oversees the logistical and operational aspects of our global mission projects, ensuring effectiveness and stewardship.',
    imageUrl: 'https://picsum.photos/seed/leader4/300/300',
    dataAiHint: 'man office desk',
    contact: 'dchen@edm.org',
  },
];

export default function LeadershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Leadership"
        subtitle="Meet the dedicated team guiding EDM's mission."
        icon={Users}
      />

      <section>
        <SectionTitle title="Guiding Our Vision" subtitle="Committed individuals leading with faith and integrity." />
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
