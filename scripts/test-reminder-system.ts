import { prisma } from '@/lib/db/prisma';
import { EventReminderService } from '@/lib/services/event-reminder-service.new';

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

    // Create reminders for the event
    await EventReminderService.createRemindersForRegistration(
      testEvent.id,
      'b39ff5cc-f159-46a3-b78f-10fac4618e5c' // Test user ID
    );

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
