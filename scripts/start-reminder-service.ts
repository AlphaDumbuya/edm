import { EventReminderService } from '../src/lib/services/event-reminder-service.new';

async function startReminderService() {
  try {
    console.log('Starting reminder service...');
    
    // Start the scheduled job (runs every 5 minutes)
    EventReminderService.startScheduledJob();
    
    // Also process reminders immediately
    console.log('Processing reminders now...');
    await EventReminderService.processReminders();
    
    console.log('Reminder service started successfully!');
    console.log('The service will check for reminders every 5 minutes.');
    console.log('Keep this terminal window open to continue processing reminders.');
    
  } catch (error) {
    console.error('Error starting reminder service:', error);
  }
}

// Start the service
startReminderService();
