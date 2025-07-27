import prisma from '../src/lib/db/prisma'; 

async function createSoonEvent() {
  // Create event happening in 35 minutes
  const event = await prisma.event.create({
    data: {
      title: 'Very Soon Test Event',
      description: 'This event is happening very soon!',
      date: new Date(Date.now() + 35 * 60 * 1000),
      time: new Date(Date.now() + 35 * 60 * 1000).toTimeString().slice(0, 5),
      location: 'Test Location',
      isVirtual: true,
      onlineLink: 'https://meet.google.com/test-soon'
    }
  });

  // Create registration
  const registration = await prisma.eventRegistration.create({
    data: {
      eventId: event.id,
      name: 'Alpha Dumbuya',
      email: 'alphadumbuya7@gmail.com',
      status: 'REGISTERED'
    }
  });

  console.log('Created event:', event);
  console.log('Created registration:', registration);
}

createSoonEvent().catch(console.error);
