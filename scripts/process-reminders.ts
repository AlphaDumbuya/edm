import { EventReminderService } from '../src/lib/services/event-reminder-service.new';

// Process pending reminders
async function processReminders() {
  await EventReminderService.processReminders();
}

processReminders().catch(console.error);
