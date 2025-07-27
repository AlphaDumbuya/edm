import prisma from '../src/lib/db/prisma';
import { EventReminderService } from '../src/lib/services/event-reminder-service.new';

async function testReminders() {
  try {
    // Create a test event in the future
    const testEvent = await prisma.event.create({
      data: {
        title: 'Test Reminder Event',
        description: 'Test event for reminder system',
        date: new Date(Date.now() + 25 * 60 * 60 * 1000), // 25 hours from now
        time: '14:00',
        location: 'Test Location',
        isVirtual: true,
        onlineLink: 'https://test.com'
      }
    });

    console.log('Created test event:', testEvent);

    // Create or find user
    let user = await prisma.user.findUnique({
      where: { email: 'alphadumbuya7@gmail.com' }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'alphadumbuya7@gmail.com',
          name: 'Alpha Dumbuya',
          hashedPassword: 'test-password-hash', // This is just for testing
          role: 'USER'
        }
      });
      console.log('Created user:', user);
    }

    // Create event registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: testEvent.id,
        name: 'Alpha Dumbuya',
        email: 'alphadumbuya7@gmail.com',
        status: 'REGISTERED'
      }
    });

    console.log('Created event registration:', registration);

    // Create reminders for the event
    await EventReminderService.createRemindersForRegistration(testEvent.id, user.id);

    console.log('Created reminders for test event');

    // Check pending reminders
    const pendingReminders = await prisma.eventReminder.findMany({
      where: {
        eventId: testEvent.id,
        status: 'PENDING'
      }
    });

    console.log('Pending reminders:', pendingReminders);

    process.exit(0);
  } catch (error) {
    console.error('Error testing reminders:', error);
    process.exit(1);
  }
}

testReminders();
