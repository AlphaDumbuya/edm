import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function debugEventReminders() {
  try {
    const now = new Date();
    console.log('Current time:', now.toLocaleString());

    // Find all reminders for the Josiah event
    const reminders = await prisma.eventReminder.findMany({
      where: {
        event: {
          title: {
            contains: "Josiah"
          }
        }
      },
      include: {
        event: true,
        user: true
      }
    });

    if (reminders.length === 0) {
      console.log('No reminders found for event containing "Josiah" in the title');
      
      // Let's check if the event exists
      const event = await prisma.event.findFirst({
        where: {
          title: {
            contains: "Josiah"
          }
        }
      });

      if (event) {
        console.log('\nEvent found but no reminders:');
        console.log('Title:', event.title);
        console.log('Date:', event.date.toLocaleDateString());
        console.log('Time:', event.time);
        console.log('Is Virtual:', event.isVirtual);
        console.log('Location/Link:', event.isVirtual ? event.onlineLink : event.location);
      }
      return;
    }

    const event = reminders[0].event; // Get event details from first reminder

    if (!event) {
      console.log('Event not found');
      return;
    }

    console.log('\nEvent details:');
    console.log('Title:', event.title);
    console.log('Date:', event.date.toLocaleDateString());
    console.log('Time:', event.time);
    console.log('Is Virtual:', event.isVirtual);
    console.log('Location/Link:', event.isVirtual ? event.onlineLink : event.location);

    console.log('\nEvent details:');
    console.log('Title:', event.title);
    console.log('Date:', event.date.toLocaleDateString());
    console.log('Time:', event.time);
    console.log('Is Virtual:', event.isVirtual);
    console.log('Location/Link:', event.isVirtual ? event.onlineLink : event.location);

    // Get registrations for this event
    const registrations = await prisma.eventRegistration.findMany({
      where: {
        eventId: event.id
      }
    });

    console.log('\nRegistrations:', registrations.length);
    registrations.forEach(reg => {
      console.log(`- ${reg.email} (${reg.name})`);
      console.log(`  Created at: ${reg.createdAt.toLocaleString()}`);
    });

    console.log('\nReminders:', reminders.length);
    reminders.forEach(reminder => {
      const timeUntil = Math.round((reminder.scheduledFor.getTime() - now.getTime()) / (60 * 1000));
      console.log(`- Type: ${reminder.type}`);
      console.log(`  Status: ${reminder.status}`);
      console.log(`  Scheduled for: ${reminder.scheduledFor.toLocaleString()}`);
      console.log(`  User: ${reminder.user.email}`);
      console.log(`  Will send in: ${timeUntil} minutes (${timeUntil < 0 ? 'PAST DUE' : 'upcoming'})`);
    });

    // Check reminder processing conditions
    const eventDate = new Date(event.date);
    const [hours, minutes] = event.time.split(':').map(Number);
    eventDate.setHours(hours, minutes, 0, 0);
    
    const diffInMinutes = (eventDate.getTime() - now.getTime()) / (60 * 1000);
    console.log('\nTiming analysis:');
    console.log(`Minutes until event: ${Math.round(diffInMinutes)}`);
    console.log('Reminder windows:');
    console.log(`- 24h reminder: ${diffInMinutes > 1320 && diffInMinutes <= 1560 ? 'ACTIVE' : 'inactive'}`);
    console.log(`- 1h reminder: ${diffInMinutes > 0 && diffInMinutes <= 90 ? 'ACTIVE' : 'inactive'}`);
    console.log(`- 30m reminder: ${diffInMinutes > 0 && diffInMinutes <= 45 ? 'ACTIVE' : 'inactive'}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the diagnostics
debugEventReminders().catch(console.error);
