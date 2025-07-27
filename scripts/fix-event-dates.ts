import prisma from '../src/lib/db/prisma';

async function fixEventDates() {
  try {
    const now = new Date();
    console.log('Current time:', now.toISOString());

    // First find the events
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { title: 'Test event 001' },
          { title: 'Test event002' }
        ]
      }
    });

    console.log('Found events:', events.length);

    for (const event of events) {
      // Set events for 30 minutes and 1 hour from now
      const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60 * 1000);
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

      const newDate = event.title === 'Test event 001' 
        ? thirtyMinsFromNow  // 30 minutes from now
        : oneHourFromNow;    // 1 hour from now

      const formatTime = (date: Date) => date.toTimeString().slice(0, 5);
      const newTime = event.title === 'Test event 001' 
        ? formatTime(thirtyMinsFromNow) 
        : formatTime(oneHourFromNow);

      // Update the event
      const updated = await prisma.event.update({
        where: {
          id: event.id
        },
        data: {
          date: newDate,
          time: newTime
        }
      });

      console.log(`Updated ${event.title}:`, {
        title: updated.title,
        date: updated.date.toISOString(),
        time: updated.time
      });

      // Reset and update registration for this event
      await prisma.eventRegistration.updateMany({
        where: {
          eventId: event.id
        },
        data: {
          reminderSentAt: null,
          lastReminderType: null,
          status: 'REGISTERED'
        }
      });

      // Log registration details
      const registration = await prisma.eventRegistration.findFirst({
        where: { eventId: event.id },
        include: { event: true }
      });
      
      console.log('Registration details:', {
        status: registration?.status,
        eventDate: registration?.event.date.toISOString(),
        timeUntilEvent: registration ? Math.round((registration.event.date.getTime() - now.getTime()) / (1000 * 60)) : null,
        reminderSentAt: registration?.reminderSentAt,
        lastReminderType: registration?.lastReminderType
      });

      console.log(`Reset reminders for ${event.title}`);
    }

    console.log('\nAll updates complete. You can now run the reminder processing script.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixEventDates();
