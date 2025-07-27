import prisma from '../src/lib/db/prisma';

async function checkTestEvents() {
  try {
    console.log('Checking test events...');
    
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { title: 'Test event 001' },
          { title: 'Test event002' }
        ]
      }
    });

    for (const event of events) {
      console.log('\nEvent:', {
        title: event.title,
        date: event.date.toLocaleString(),
        time: event.time,
        location: event.location
      });

      // Check registrations
      const registrations = await prisma.eventRegistration.findMany({
        where: { eventId: event.id }
      });
      console.log('Registrations:', registrations.length);

      // Check reminders
      const reminders = await prisma.eventReminder.findMany({
        where: { eventId: event.id }
      });
      console.log('Reminders:', reminders.length);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTestEvents();
