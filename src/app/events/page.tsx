import PageHeader from '@/components/shared/page-header';
import EventCard from '@/components/events/event-card';
import { CalendarDays } from 'lucide-react';
import { getAllEventsAction } from '../admin/events/actions';

export const revalidate = 0; // Add revalidation at the page level

export default async function EventsPage() {
  const eventData = await getAllEventsAction();

  // Format and sort events
  const formattedEvents = eventData.events.map(event => ({
    ...event,
    date: typeof event.date === 'string' ? event.date : new Date(event.date).toISOString().split('T')[0], // Handle both string and Date objects
    imageUrl: event.imageUrl || undefined, // Convert null to undefined
    onlineLink: event.onlineLink || undefined, // Convert null to undefined
  }));

  // Sort events by date in ascending order
  const sortedEvents = formattedEvents.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  // Filter out past events
  const currentDate = new Date();
  const upcomingEvents = sortedEvents.filter(event => {
    const eventDate = new Date(event.date);
    // Consider the end of the day for past event filtering
    return eventDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  });

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Upcoming Events"
        subtitle="Join us for fellowship, growth, and service opportunities in Sierra Leone and with our Oregon partners."
        icon={CalendarDays}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No upcoming events scheduled at this time.</p>
        )}
      </div>
    </div>
  );
}
