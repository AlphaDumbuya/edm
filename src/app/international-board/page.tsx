import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import LeaderProfile from '@/components/about/leader-profile';
import { Globe } from 'lucide-react';

const founderAndCEO = {
  name: 'Edwin Kargbo',
  role: 'Founder & CEO, EDM',
  bio: 'Driven by a divine burden for the church in Sierra Leone, this leader established EDM to prioritize evangelism, create robust discipleship structures, and engage in impactful missions. The vision is to see Sierra Leone transformed by the Gospel.',
  imageUrl: 'https://code-alpha-image-gallary.vercel.app/edwin-kargbo.png',
  dataAiHint: 'Edwin Kargbo founder EDM',
  contact: 'edwinjkargbo@yahoo.com',
  location: 'Sierra Leone',
};

const countryDirector = {
  name: 'Pastor Dominic Dumbuya',
  role: 'Country Director, Sierra Leone',
  bio: 'Serves as the Country Director for EDM in Sierra Leone, providing leadership and oversight for all operations within the country.',
  imageUrl: 'https://code-alpha-image-gallary.vercel.app/images/pst-deee.png', // Placeholder
  dataAiHint: 'Pastor Dominic Dumbuya Country Director Sierra Leone',
  contact: 'pastordominicdumbuya@gmail.com',
  location: 'Sierra Leone',
};

const bibleSchoolDirector = {
  name: 'Samuel Tarawally',
  role: 'Board Member/Administrator',
  bio: 'Focused on the operational efficiency and logistical support for EDM\'s initiatives in Sierra Leone, ensuring effective execution of programs.',
  imageUrl: 'https://code-alpha-image-gallary.vercel.app/tarawalley.png', // Placeholder
  dataAiHint: 'Samuel Tarawalley Bible School Director Sierra Leone',
  contact: 'Starawally@yahoo.uk',
  location: 'Sierra Leone',
};

const boardMembersSierraLeone = [
  {
    name: 'Rev. Samuel Samurah Kargbo',
    role: 'Board Member',
    bio: 'Representing the clergy on the EDM board, providing spiritual guidance and contributing to the alignment of ministry activities with theological principles.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/images/rev-samuel.png', 
    dataAiHint: 'Rev Samuel Samurah Kargbo Board Member Sierra Leone',
    contact: 'samuelsamurahkargbo@yahoo.com',
    location: 'Sierra Leone',
  },
  {
    name: 'Pastor Paul Ken Bockarie',
    role: 'Board Member',
    bio: 'Bringing valuable experience and dedication to the EDM board, contributing to strategic decisions and the ministry\'s impact in Sierra Leone.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/images/paul.jpg', // Placeholder
    dataAiHint: 'Paul Ken Bockarie Board Member Sierra Leone',
    contact: 'kennbock@gmail.com',
    location: 'Sierra Leone',
  },
  {
    ...bibleSchoolDirector,
  },
];

const executiveMembers = [
  {
    ...countryDirector,
  },

  {
    name: 'Michael Kargo',
    role: 'Financial Secretary - Sierra Leone',
    bio: 'Serving EDM as the Financial Secretary based in Freetown, ensuring diligent stewardship of resources to support the ministrys operations and outreach in Sierra Leone.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/michael.png',
    dataAiHint: 'Michael Kargo Financial Secretary - Sierra Leone',
    contact: 'kargbomichael67@gmail.com',
    location: 'Sierra Leone',
  },
  {
    name: 'Samuel Kargbo',
    role: 'Mission Coordinator',
    bio: 'Coordinating all activities across western area Sierra Leone.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/images/pst-samuel.png', // Placeholder
    dataAiHint: 'Samuel Kargbo Mission Coordinator',
    contact: 'samuelkargbo349@gmail.com',
    location: 'Sierra Leone',
  },
  {
    name: 'Andrew Challey',
    role: 'Secretary to the Executive',
    bio: 'Provides essential administrative support and serves as the central point of communication for the Executive leadership of EDM.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/andrew.png',
    dataAiHint: 'finance expert professional',
    contact: 'andrew.challey@edm.org',
    location: 'Sierra Leone',
  },

  {
    name: 'Daniel Fornah',
    role: 'EDM Northern Coordinator',
    bio: 'Leads regional ministry initiatives in the North, coordinating local leaders and fostering partnerships to expand the Gospel’s impact across the region.',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/images/daniel-fornah.png',
    dataAiHint: 'Daniel Fornah EDM Northern Coordinator',
    contact: 'daniepedia@gmail.com',
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
          <LeaderProfile {...founderAndCEO} />
        </div>
      </section>

      <section>
        <SectionTitle
          title="EDM Board Members Sierra Leone"
          subtitle="Dedicated leaders overseeing the ministry's operations and growth within Sierra Leone."
        />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {boardMembersSierraLeone.map((member) => (
            <LeaderProfile key={member.name} {...member} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          title="Executive Leadership"
          subtitle="Operational leaders steering the daily functions and strategy of EDM."
        />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {executiveMembers.map((member) => (
            <LeaderProfile key={member.name} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}
