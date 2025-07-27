import prisma from '../src/lib/db/prisma';
import { EventReminderService } from '../src/lib/services/event-reminder-service.new';
import { Event, EventReminder } from '@prisma/client';

async function testUpcomingReminders() {
  try {
    const now = new Date();
    
    // 1. Create two test events (30 mins and 1 hour from now)
    const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60 * 1000);
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    // Format time as HH:mm
    const formatTime = (date: Date) => {
      return date.toTimeString().slice(0, 5);
    };

    const event1 = await prisma.event.create({
      data: {
        title: "Test Event (30 mins)",
        description: "This is a test event happening in 30 minutes",
        date: thirtyMinsFromNow,
        time: formatTime(thirtyMinsFromNow),
        location: "Virtual",
        isVirtual: true,
        onlineLink: "https://meet.google.com/test-link-1"
      }
    });

    const event2 = await prisma.event.create({
      data: {
        title: "Test Event (1 hour)",
        description: "This is a test event happening in 1 hour",
        date: oneHourFromNow,
        time: formatTime(oneHourFromNow),
        location: "Virtual",
        isVirtual: true,
        onlineLink: "https://meet.google.com/test-link-2"
      }
    });

    console.log('Created test events:', { 
      event1: { id: event1.id, time: event1.time, date: event1.date.toLocaleString() },
      event2: { id: event2.id, time: event2.time, date: event2.date.toLocaleString() }
    });

    // 2. Create a test user if not exists
    const testUser = await prisma.user.upsert({
      where: {
        email: "alphadumbuya7@gmail.com"
      },
      update: {},
      create: {
        email: "alphadumbuya7@gmail.com",
        name: "Alpha Dumbuya",
        hashedPassword: "test-password-hash",
        role: "USER"
      }
    });

    console.log('Test user ready:', { id: testUser.id, email: testUser.email });

    // 3. Create event reminders for both events
    await EventReminderService.createRemindersForRegistration(event1.id, testUser.id);
    await EventReminderService.createRemindersForRegistration(event2.id, testUser.id);
    
    console.log('Reminders created for both events');

    // 4. Verify reminders were created for both events
    const reminders = await prisma.eventReminder.findMany({
      where: {
        eventId: { in: [event1.id, event2.id] },
        userId: testUser.id
      },
      include: {
        event: true
      },
      orderBy: {
        scheduledFor: 'asc'
      }
    });

    console.log('\nCreated reminders:');
    reminders.forEach((reminder: EventReminder & { event: Event }) => {
      const timeUntil = Math.round((reminder.scheduledFor.getTime() - new Date().getTime()) / (1000 * 60));
      console.log(`\n- Event: ${reminder.event.title}`);
      console.log(`  Type: ${reminder.type} reminder`);
      console.log(`  Scheduled for: ${reminder.scheduledFor.toLocaleString()}`);
      console.log(`  Will send in approximately ${timeUntil} minutes`);
    });

    // 5. Show next steps
    console.log('\nTest setup complete!');
    console.log('Next steps:');
    console.log('1. The reminders will be processed automatically by the cron job every 5 minutes');
    console.log('2. You can manually trigger reminder processing by running:');
    console.log('   await EventReminderService.processReminders()');
    console.log('3. Check your email for the reminders as they are sent');
    
  } catch (error) {
    console.error('Error in test script:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testUpcomingReminders().catch(console.error);
