
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import EventCard from '@/components/events/event-card';
import { CalendarDays } from 'lucide-react';

const events = [
  {
    id: '1',
    title: 'EDM Evangelism Training Conference',
    date: 'November 10-12, 2024',
    location: 'EDM Campus (Under Development), Freetown',
    description: 'Join us for intensive training on effective evangelism strategies tailored for Sierra Leone. Keynotes, workshops, and practical outreach sessions. Open to all passionate about sharing the Gospel.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'conference evangelism training africa',
  },
  {
    id: '2',
    title: '"Jesus" Movie Outreach Night - Kossoh Town',
    date: 'November 20, 2024',
    location: 'Kossoh Town Community Field, Freetown',
    description: 'A special community screening of the "Jesus" film. An opportunity to share the story of Christ with hundreds. Volunteers needed for setup and follow-up.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'outdoor movie screening africa night',
  },
  {
    id: '3',
    title: 'Ohio - Sierra Leone Partnership Summit (Online & In-Person)',
    date: 'December 5, 2024',
    location: 'Columbus, Ohio (Partner Venue) & Online',
    description: 'Connecting our Ohio partners with the work in Sierra Leone. Updates, prayer, and strategic planning for future collaboration in evangelism and discipleship.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'people meeting video conference diverse',
  },
  {
    id: '4',
    title: 'EDM Discipleship Leaders Retreat (Bo)',
    date: 'January 10-12, 2025',
    location: 'Bo Retreat Center (Future Site), Sierra Leone',
    description: 'A focused retreat for current and aspiring discipleship leaders within EDM. Deepening faith, sharing best practices, and planning for church growth.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sierra leone group study nature',
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Upcoming Events"
        subtitle="Join us for fellowship, growth, and service opportunities in Sierra Leone and with our Ohio partners."
        icon={CalendarDays}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
