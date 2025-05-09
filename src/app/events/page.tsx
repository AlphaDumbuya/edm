import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import EventCard from '@/components/events/event-card';
import { CalendarDays } from 'lucide-react';

const events = [
  {
    id: '1',
    title: 'EDM Annual Conference (Freetown & Online)',
    date: 'October 15-17, 2024',
    location: 'Freetown, Sierra Leone & Online',
    description: 'Join mission leaders from Sierra Leone, Ohio, and beyond to discuss strategies, share testimonies, and pray for revival. Keynotes, workshops, and networking.',
    imageUrl: 'https://picsum.photos/seed/eventconfSL/600/400',
    dataAiHint: 'conference sierra leone',
  },
  {
    id: '2',
    title: 'Freetown Community Impact Day',
    date: 'November 5, 2024',
    location: 'Various locations, Freetown',
    description: 'Partner with local churches to serve Freetown. Projects include neighborhood cleanup, supporting local schools, and visiting healthcare facilities. Show Christ\'s love in action.',
    imageUrl: 'https://picsum.photos/seed/eventcommSL/600/400',
    dataAiHint: 'volunteers freetown smiling',
  },
  {
    id: '3',
    title: 'Youth Leadership Training (Ohio)',
    date: 'December 2-3, 2024',
    location: 'Columbus, Ohio (Partner Venue)',
    description: 'Equipping young leaders from our Ohio partner network (ages 15-25) with tools for effective ministry and cross-cultural engagement.',
    imageUrl: 'https://picsum.photos/seed/eventyouthOH/600/400',
    dataAiHint: 'young people ohio discussion',
  },
  {
    id: '4',
    title: 'Discipleship Retreat (Bo, Sierra Leone)',
    date: 'January 10-12, 2025',
    location: 'Bo Retreat Center, Sierra Leone',
    description: 'A weekend for believers in Sierra Leone dedicated to deepening their relationship with Christ and learning how to disciple others. Teaching, small groups, and personal reflection.',
    imageUrl: 'https://picsum.photos/seed/eventretreatSL/600/400',
    dataAiHint: 'sierra leone nature serene',
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Upcoming Events"
        subtitle="Join us for fellowship, growth, and service in Sierra Leone and Ohio."
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

