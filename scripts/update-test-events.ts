import prisma from '../src/lib/db/prisma';

async function updateTestEventDates() {
  try {
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
      // Determine the correct time based on event title
      const newDate = event.title === 'Test event 001' 
        ? new Date('2025-07-27T08:45:00Z')
        : new Date('2025-07-27T09:11:00Z');

      const newTime = event.title === 'Test event 001' ? '08:45' : '09:11';

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
        date: updated.date.toISOString(),
        time: updated.time
      });

      // Reset reminder flags for this event
      await prisma.eventRegistration.updateMany({
        where: {
          eventId: event.id
        },
        data: {
          reminderSentAt: null,
          lastReminderType: null
        }
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

updateTestEventDates();
