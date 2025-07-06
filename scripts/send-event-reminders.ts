// scripts/send-event-reminders.ts
import { getUpcomingEventRegistrations } from '../src/lib/db/eventRegistrations';
import fetch from 'node-fetch';

async function sendReminders() {
  const registrations = await getUpcomingEventRegistrations(1); // 1 hour ahead
  for (const reg of registrations) {
    const { name, email, event } = reg;
    // Call the reminder API endpoint
    await fetch('http://localhost:3000/api/events/reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, event }),
    });
    console.log(`Reminder sent to ${email} for event ${event.title}`);
  }
}

sendReminders().catch(console.error);
