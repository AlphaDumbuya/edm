import prisma from '../src/lib/db/prisma';

async function checkReminderTiming() {
  try {
    const now = new Date();
    console.log('Current time:', now.toISOString());

    // Find all test events
    const registrations = await prisma.eventRegistration.findMany({
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

    for (const reg of registrations) {
      const event = reg.event;
      const eventTime = new Date(event.date);
      const minutesUntilEvent = Math.round((eventTime.getTime() - now.getTime()) / (1000 * 60));

      console.log(`\nEvent: ${event.title}`);
      console.log('Event details:', {
        date: event.date.toISOString(),
        time: event.time,
        minutesUntilEvent,
        status: reg.status,
        reminderSentAt: reg.reminderSentAt,
        lastReminderType: reg.lastReminderType
      });

      // Check reminder windows
      const reminderWindows = [
        { type: '30min', minutes: 30 },
        { type: '1hour', minutes: 60 },
        { type: '1day', minutes: 1440 },
        { type: '1week', minutes: 10080 }
      ];

      console.log('\nReminder windows:');
      for (const window of reminderWindows) {
        const shouldSendReminder = minutesUntilEvent <= window.minutes && 
          (!reg.lastReminderType || reg.lastReminderType !== window.type);
        
        console.log(`${window.type}: ${shouldSendReminder ? 'SHOULD SEND' : 'not needed'} (${minutesUntilEvent} mins until event vs ${window.minutes} min window)`);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkReminderTiming();
