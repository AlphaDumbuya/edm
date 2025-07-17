import PageHeader from '@/components/shared/page-header';
import EventCard from '@/components/events/event-card';
import { CalendarDays } from 'lucide-react';
import { getAllEvents } from '@/lib/db/events';
import type { Prisma } from '@prisma/client';
type EventWithoutRelations = Omit<Prisma.EventGetPayload<{}>, 'eventRegistrations'>;

export default async function EventsPage() {
  // Get events that haven't expired yet
  const eventData = await getAllEvents({ includeExpired: false });

  // Transform dates to strings and handle null values
  const sortedEvents = eventData.events
    .map(event => ({
      ...event,
      // Convert date to YYYY-MM-DD format
      date: event.date.toISOString().split('T')[0],
      // Ensure null values stay null rather than becoming undefined
      imageUrl: event.imageUrl || null,
      onlineLink: event.onlineLink || null,
      cancelled: event.cancelled ?? false,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Upcoming Events"
        subtitle="Join us for fellowship, growth, and service opportunities in Sierra Leone and with our Oregon partners."
        icon={CalendarDays}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No upcoming events scheduled at this time.
          </p>
        )}
      </div>
    </div>
  );
}
