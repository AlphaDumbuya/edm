// scripts/send-event-reminders.ts
require('dotenv').config();
import { getUpcomingEventRegistrations } from '../src/lib/db/eventRegistrations';
import fetch from 'node-fetch';
import { scheduleJob } from 'node-schedule';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9003';

async function sendReminders() {
  try {
    console.log('Checking for upcoming events...');
    const registrations = await getUpcomingEventRegistrations(1); // 1 hour ahead
    
    if (registrations.length === 0) {
      console.log('No upcoming events found needing reminders.');
      return;
    }

    console.log(`Found ${registrations.length} registrations needing reminders.`);
    
    for (const reg of registrations) {
      const { name, email, event } = reg;
      try {
        // Call the reminder API endpoint
        const response = await fetch(`${SITE_URL}/api/events/reminder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, event }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`✅ Reminder sent to ${email} for event ${event.title}`);
      } catch (error) {
        console.error(`Failed to send reminder to ${email}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in sendReminders:', error);
  }
}

// Run the job every 5 minutes
scheduleJob('*/5 * * * *', async () => {
  console.log('Running scheduled reminder check:', new Date().toISOString());
  await sendReminders();
});

// Initial run
console.log('Starting event reminder service...');
sendReminders().catch(console.error);
