import prisma from '../src/lib/db/prisma';
import { addMinutes, format } from 'date-fns';

async function createTestEvent() {
  const eventTime = new Date();
  eventTime.setHours(14);
  eventTime.setMinutes(8); // Set to 14:08
  
  const event = await prisma.event.create({
    data: {
      title: 'Test Event for Reminders',
      description: 'Test event to verify reminder system',
      date: eventTime,
      time: format(eventTime, 'HH:mm'),
      location: 'Test Location',
      isVirtual: true,
      onlineLink: 'https://test-meeting.com/test',
      eventRegistrations: {
        create: {
          name: 'Alpha Dumbuya',
          email: 'alphadumbuya7@gmail.com'
        }
      }
    },
    include: {
      eventRegistrations: true
    }
  });

  console.log('Created test event:', {
    id: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    registrations: event.eventRegistrations.length
  });
}

createTestEvent().catch(console.error);
