import { PrismaClient } from '@prisma/client';
import { EventReminderService } from '../src/lib/services/event-reminder.service';
const prisma = new PrismaClient();

async function testRegisteredEvent() {
  try {
    const now = new Date();
    console.log('Current time:', now.toLocaleString());

    // Create a test event that starts in 10 minutes
    const eventTime = new Date(now.getTime() + 10 * 60 * 1000);
    const event = await prisma.event.create({
      data: {
        title: "Quick Test Event (10min)",
        description: "This is a test event starting in 10 minutes",
        date: eventTime,
        time: eventTime.toLocaleTimeString('en-US', { 
          hour: 'numeric',
          minute: '2-digit',
          hour12: true 
        }),
        location: "Virtual",
        isVirtual: true,
        onlineLink: "https://meet.google.com/test-10min"
      }
    });

    console.log('Created event:', { 
      id: event.id, 
      title: event.title, 
      date: event.date.toLocaleString(),
      time: event.time 
    });

    // Create or get test user
    const user = await prisma.user.upsert({
      where: {
        email: "alphadumbuya7@gmail.com"
      },
      update: {},
      create: {
        email: "alphadumbuya7@gmail.com",
        name: "Alpha Dumbuya",
        hashedPassword: "test-password-hash",
        role: "USER",
        emailNotifications: true,
        emailVerified: true
      }
    });

    console.log('User ready:', { id: user.id, email: user.email });

    // Create event registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: event.id,
        name: user.name || 'Alpha Dumbuya',
        email: user.email
      }
    });

    console.log('Created registration:', { 
      id: registration.id,
      eventId: registration.eventId,
      name: registration.name,
      email: registration.email
    });

    // Create 5-minute reminder
    console.log('\nCreating 5-minute reminder...');
    const fiveMinutesBefore = new Date(event.date.getTime() - 5 * 60 * 1000);
    await prisma.eventReminder.create({
      data: {
        eventId: event.id,
        userId: user.id,
        type: '5m',
        scheduledFor: fiveMinutesBefore,
        status: 'PENDING'
      }
    });
    console.log('Reminder created for 5 minutes before event');

    // Check created reminders
    const reminders = await prisma.eventReminder.findMany({
      where: {
        eventId: event.id,
        userId: user.id
      },
      orderBy: {
        scheduledFor: 'asc'
      }
    });

    console.log('\nReminders in database:', reminders.length);

    // Call the reminder processing endpoint
    console.log('\nProcessing reminders...');
    const response = await fetch('http://localhost:9003/api/dev/process-reminders');
    const result = await response.json();
    console.log('Process result:', result);

    console.log('\nSetup complete!');
    console.log('The reminder should be sent approximately 5 minutes before the event.');
    console.log('Event starts at:', event.time);
    console.log('Check your email (alphadumbuya7@gmail.com) for the reminder.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testRegisteredEvent().catch(console.error);
