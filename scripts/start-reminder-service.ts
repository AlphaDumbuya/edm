import { EventReminderService } from '../src/lib/services/event-reminder-service.new';

async function startReminderService() {
  try {
    console.log('Starting reminder service...');
    

    
    // Also process reminders immediately
    console.log('Processing reminders now...');
    await EventReminderService.processReminders();
    
    console.log('Reminder service started successfully!');

    
  } catch (error) {
    console.error('Error starting reminder service:', error);
  }
}

// Start the service
startReminderService();
