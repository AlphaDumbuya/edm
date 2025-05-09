import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import EventCard from '@/components/events/event-card';
import { CalendarDays } from 'lucide-react';

const events = [
  {
    id: '1',
    title: 'Global Mission Conference 2024',
    date: 'October 15-17, 2024',
    location: 'Online Event',
    description: 'Join mission leaders from around the world to discuss strategies, share testimonies, and pray for global revival. Keynote speakers, workshops, and networking opportunities.',
    imageUrl: 'https://picsum.photos/seed/eventconf/600/400',
    dataAiHint: 'conference people listening',
  },
  {
    id: '2',
    title: 'Community Outreach Day - City Serve',
    date: 'November 5, 2024',
    location: 'Downtown Community Center',
    description: 'Partner with local churches to serve our city. Projects include park cleanup, food bank support, and visiting elderly homes. A great way to show Christ\'s love in action.',
    imageUrl: 'https://picsum.photos/seed/eventcomm/600/400',
    dataAiHint: 'volunteers group smiling',
  },
  {
    id: '3',
    title: 'Youth Evangelism Training',
    date: 'December 2-3, 2024',
    location: 'EDM Headquarters',
    description: 'Equipping young people (ages 15-25) with tools and confidence to share their faith effectively. Interactive sessions and practical outreach experience.',
    imageUrl: 'https://picsum.photos/seed/eventyouth/600/400',
    dataAiHint: 'young people discussion',
  },
  {
    id: '4',
    title: 'Discipleship Intensive Weekend',
    date: 'January 10-12, 2025',
    location: 'Mountain Retreat Center',
    description: 'A weekend dedicated to deepening your relationship with Christ and learning how to disciple others. Teaching, small groups, and personal reflection time.',
    imageUrl: 'https://picsum.photos/seed/eventretreat/600/400',
    dataAiHint: 'nature serene landscape',
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Upcoming Events"
        subtitle="Join us for fellowship, growth, and service opportunities."
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
