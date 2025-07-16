import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTestEvent() {
  try {
    // Create an event starting 30 minutes from now
    const startTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    
    const event = await prisma.event.create({
      data: {
        title: 'Test Event',
        description: 'This is a test event for testing reminders',
        date: startTime,
        time: startTime.toLocaleTimeString(),
        location: 'Test Location',
        isVirtual: true,
        onlineLink: 'https://test-meeting.zoom.us/j/123456789'
      },
    });

    console.log('Created test event:', event);

    // Create a test registration for this event
    const registration = await prisma.eventRegistration.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        eventId: event.id,
      },
    });

    console.log('Created test registration:', registration);

  } catch (error) {
    console.error('Error creating test event:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestEvent();
