import prisma from '../src/lib/db/prisma';
import { EventReminderService } from '../src/lib/services/event-reminder-service.new';

async function setupNoeEventReminders() {
  try {
    // 1. Find your event
    const event = await prisma.event.findFirst({
      where: {
        title: "Noe",
        location: "Kenema, Sierra Leone"
      }
    });

    if (!event) {
      console.error('Event not found');
      return;
    }

    console.log('Found event:', { 
      id: event.id, 
      title: event.title, 
      date: event.date.toLocaleString() 
    });

    // 2. Create reminders for your account
    await EventReminderService.createRemindersForRegistration(event.id, 'your-user-id');
    console.log('Reminders created successfully');

    // 3. Process reminders immediately
    await EventReminderService.processReminders();
    console.log('Reminders processed');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
setupNoeEventReminders().catch(console.error);
