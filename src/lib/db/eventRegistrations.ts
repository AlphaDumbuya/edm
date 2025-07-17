import prisma from '../db/prisma';

export async function createEventRegistration({ name, email, eventId }: { name: string; email: string; eventId: string }) {
  return prisma.eventRegistration.create({
    data: {
      name,
      email,
      eventId,
    },
  });
}

export async function getEventRegistrationsForEvent(eventId: string) {
  return prisma.eventRegistration.findMany({
    where: { eventId },
  });
}

export async function getUpcomingEventRegistrations(minutesAhead: number = 60) {
  const now = new Date();
  const soon = new Date(now.getTime() + minutesAhead * 60 * 1000);

  // Get all upcoming events first
  const registrations = await prisma.eventRegistration.findMany({
    where: {
      AND: [
        // Only get registrations that haven't received this type of reminder yet
        {
          OR: [
            { reminderSentAt: null },
            { 
              AND: [
                { reminderSentAt: { not: null } },
                { lastReminderType: { not: minutesAhead === 60 ? '1hour' : minutesAhead === 1440 ? '1day' : '1week' } }
              ]
            }
          ]
        },
        // Event must be in the future
        {
          event: {
            date: {
              gte: new Date(now.toISOString().split('T')[0]) // Start of today
            }
          }
        }
      ]
    },
    include: { 
      event: true 
    }
  });

  // Filter events based on their actual date and time
  return registrations.filter(reg => {
    const eventDate = new Date(reg.event.date);
    const [hours, minutes] = reg.event.time.split(':').map(Number);
    
    // Set the event time
    eventDate.setHours(hours, minutes, 0, 0);
    
    // Calculate the time difference in minutes
    const diffInMinutes = (eventDate.getTime() - now.getTime()) / (60 * 1000);
    
    // For 1-hour reminders: between now and 60 minutes from now
    // For 1-day reminders: between 23-25 hours from now
    // For 1-week reminders: between 6.9-7.1 days from now
    if (minutesAhead === 60) {
      return diffInMinutes > 0 && diffInMinutes <= 60;
    } else if (minutesAhead === 1440) {
      return diffInMinutes > 1380 && diffInMinutes <= 1500; // 23-25 hours
    } else {
      return diffInMinutes > 9900 && diffInMinutes <= 10260; // 6.9-7.1 days
    }
  });
}
