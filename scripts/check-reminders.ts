import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkReminders() {
  try {
    const now = new Date();
    console.log('Current time:', now.toLocaleString());

    // Get all reminders from the last hour
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const reminders = await prisma.eventReminder.findMany({
      where: {
        scheduledFor: {
          gte: oneHourAgo,
          lte: now
        }
      },
      include: {
        event: true,
        user: true
      },
      orderBy: {
        scheduledFor: 'asc'
      }
    });

    console.log('\nFound', reminders.length, 'recent reminders:');
    reminders.forEach(reminder => {
      console.log(`\nReminder for "${reminder.event.title}"`);
      console.log(`Type: ${reminder.type}`);
      console.log(`Status: ${reminder.status}`);
      console.log(`Scheduled for: ${reminder.scheduledFor.toLocaleString()}`);
      console.log(`User: ${reminder.user.email}`);
      console.log(`Event time: ${reminder.event.date.toLocaleString()}`);
    });

    // Check for any processed reminders
    const processedReminders = reminders.filter(r => r.status === 'SENT');
    console.log('\nProcessed reminders:', processedReminders.length);

    // Check for pending reminders that should have been sent
    const pendingReminders = reminders.filter(r => 
      r.status === 'PENDING' && 
      r.scheduledFor <= now
    );
    console.log('Pending reminders that should have been sent:', pendingReminders.length);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkReminders().catch(console.error);
