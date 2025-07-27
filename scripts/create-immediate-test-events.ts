import prisma from '../src/lib/db/prisma';

async function createTestEvents() {
  const email = 'alphadumbuya7@gmail.com';
  const now = new Date();

  // Create events at different time intervals for testing
  const events = [
    {
      minutes: 25,  // For 30min reminder
      type: '30min'
    },
    {
      minutes: 45,  // For 1hour reminder
      type: '1hour'
    },
    {
      minutes: 1400,  // For 1day reminder
      type: '1day'
    },
    {
      minutes: 10000,  // For 1week reminder
      type: '1week'
    }
  ];

  for (const event of events) {
    const eventDate = new Date(now.getTime() + event.minutes * 60 * 1000);
    
    // Format time as HH:mm
    const hours = eventDate.getHours().toString().padStart(2, '0');
    const minutes = eventDate.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    console.log(`Creating event for ${event.type} reminder, scheduled for ${eventDate.toISOString()} at ${timeString}`);
    
    // Create the event
    const createdEvent = await prisma.event.create({
      data: {
        title: `Test Event for ${event.type} Reminder`,
        description: `This is a test event to verify the ${event.type} reminder`,
        date: eventDate,
        time: timeString,
        location: 'Test Location',
        isVirtual: false,
      }
    });

    // Create a registration for the event
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: createdEvent.id,
        status: 'REGISTERED',
        name: 'Alpha Dumbuya',
        email
      }
    });

    console.log(`✅ Created event and registration for ${event.type} reminder`);
  }

  console.log('Done creating test events and registrations');
}

createTestEvents().then(() => {
  console.log('Script complete');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
