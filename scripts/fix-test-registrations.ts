import prisma from '../src/lib/db/prisma';

async function fixRegistrations() {
  try {
    // 1. Find all your test events
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { title: 'Test event 001' },
          { title: 'Test event002' }
        ]
      }
    });

    console.log(`Found ${events.length} events`);

    for (const event of events) {
      // 2. Update registration status to REGISTERED
      const updated = await prisma.eventRegistration.updateMany({
        where: {
          eventId: event.id
        },
        data: {
          status: 'REGISTERED',
          reminderSentAt: null, // Reset reminder sent status to trigger new reminders
          lastReminderType: null
        }
      });

      console.log(`Updated registration for event: ${event.title}`);
    }

    // 3. Show final state
    const finalState = await prisma.eventRegistration.findMany({
      where: {
        event: {
          OR: [
            { title: 'Test event 001' },
            { title: 'Test event002' }
          ]
        }
      },
      include: {
        event: true
      }
    });

    console.log('\nFinal state of registrations:');
    finalState.forEach(reg => {
      console.log(`\nEvent: ${reg.event.title}`);
      console.log(`Status: ${reg.status}`);
      console.log(`Email: ${reg.email}`);
      console.log(`Last reminder: ${reg.lastReminderType || 'none'}`);
      console.log(`Reminder sent at: ${reg.reminderSentAt || 'not sent'}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixRegistrations();
