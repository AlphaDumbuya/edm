
import PageHeader from '@/components/shared/page-header';
import EventCard from '@/components/events/event-card';
import { CalendarDays } from 'lucide-react';
import { getAllEventsAction } from '../admin/events/actions';

interface Event {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
}


export default async function EventsPage() {
  const eventData = await getAllEventsAction(); // Assuming getAllEventsAction returns { events: Event[] }

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Upcoming Events"
        subtitle="Join us for fellowship, growth, and service opportunities in Sierra Leone and with our Oregon partners."
        icon={CalendarDays}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventData.events.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
