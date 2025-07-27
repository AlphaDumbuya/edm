import prisma from '../src/lib/db/prisma';

async function createNearbyTestEvents() {
  const now = new Date();
  const events = [
    {
      title: 'Test Event - 30min',
      description: 'Test event for 30min reminder.',
      date: new Date(now.getTime() + 30 * 60 * 1000).toISOString(),
      time: new Date(now.getTime() + 30 * 60 * 1000).toTimeString().slice(0, 5),
      location: 'Test Location',
      isVirtual: true,
      onlineLink: 'https://meet.google.com/test-30min',
    },
    {
      title: 'Test Event - 1hour',
      description: 'Test event for 1hour reminder.',
      date: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
      time: new Date(now.getTime() + 60 * 60 * 1000).toTimeString().slice(0, 5),
      location: 'Test Location',
      isVirtual: true,
      onlineLink: 'https://meet.google.com/test-1hour',
    },
    {
      title: 'Test Event - 1day',
      description: 'Test event for 1day reminder.',
      date: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      time: new Date(now.getTime() + 24 * 60 * 60 * 1000).toTimeString().slice(0, 5),
      location: 'Test Location',
      isVirtual: true,
      onlineLink: 'https://meet.google.com/test-1day',
    },
    {
      title: 'Test Event - 1week',
      description: 'Test event for 1week reminder.',
      date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      time: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toTimeString().slice(0, 5),
      location: 'Test Location',
      isVirtual: true,
      onlineLink: 'https://meet.google.com/test-1week',
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
    console.log(`Created event: ${event.title}`);
  }
}

createNearbyTestEvents().catch(console.error);
