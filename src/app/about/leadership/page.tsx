import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import LeaderProfile from '@/components/about/leader-profile';
import { Users } from 'lucide-react';

const leaders = [
  {
    name: 'Dr. Evelyn Reed',
    role: 'President & CEO (Freetown Office)',
    bio: 'Dr. Reed has over 20 years of experience in mission leadership, focusing on community transformation in Sierra Leone. Her passion is to see the Gospel bring tangible hope and change.',
    imageUrl: 'https://picsum.photos/seed/leader1/300/300',
    dataAiHint: 'professional woman portrait african',
    contact: 'ereed@edm.org',
  },
  {
    name: 'Pastor Samuel Green',
    role: 'Vice President, Evangelism & Ohio Partnerships',
    bio: 'Pastor Green is a dynamic speaker, dedicated to sharing God\'s love in Sierra Leone and fostering strong ministry partnerships with churches and organizations in Ohio, USA.',
    imageUrl: 'https://picsum.photos/seed/leader2/300/300',
    dataAiHint: 'smiling man portrait african american',
    contact: 'sgreen@edm.org',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Director of Discipleship (Sierra Leone Focus)',
    bio: 'Maria has a heart for mentoring and equipping believers in Sierra Leone to grow deep in their faith. She develops local resources and training programs.',
    imageUrl: 'https://picsum.photos/seed/leader3/300/300',
    dataAiHint: 'woman teaching group sierra leone',
    contact: 'mrodriguez@edm.org',
  },
  {
    name: 'David Chen',
    role: 'Director of Operations (Freetown & Ohio Coordination)',
    bio: 'David oversees the logistical and operational aspects of our mission projects in Sierra Leone and coordinates efforts with our Ohio partners, ensuring effectiveness and stewardship.',
    imageUrl: 'https://picsum.photos/seed/leader4/300/300',
    dataAiHint: 'man office desk planning',
    contact: 'dchen@edm.org',
  },
];

export default function LeadershipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Leadership"
        subtitle="Meet the dedicated team guiding EDM's mission in Sierra Leone and Ohio."
        icon={Users}
      />

      <section>
        <SectionTitle title="Guiding Our Vision" subtitle="Committed individuals leading with faith and integrity across our focus regions." />
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

