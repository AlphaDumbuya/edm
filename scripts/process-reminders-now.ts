import { EventReminderService } from '../src/lib/services/event-reminder-service.new';

console.log('Starting reminder processing...');

EventReminderService.processReminders()
  .then(() => {
    console.log('Reminder processing complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error processing reminders:', error);
    process.exit(1);
  });
