// scripts/send-event-reminders.ts
require('dotenv').config();
import { getUpcomingEventRegistrations } from '../src/lib/db/eventRegistrations';
import fetch from 'node-fetch';
import { scheduleJob } from 'node-schedule';
import prisma from '../src/lib/db/prisma';

// Configure logging
function log(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

// Error logging
function logError(message: string, error: any) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${message}`);
  console.error(error);
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9003';

const REMINDER_SCHEDULES = [
  { minutes: 60, type: '1hour' },    // 1 hour before
  { minutes: 1440, type: '1day' },   // 24 hours before
  { minutes: 10080, type: '1week' }  // 1 week before
];

async function sendReminders() {
  try {
    const now = new Date();
    log('Starting reminder check');
    
    // Log current time and schedule windows
    const scheduleWindows = REMINDER_SCHEDULES.map(schedule => {
      const targetTime = new Date(now.getTime() + schedule.minutes * 60 * 1000);
      return {
        type: schedule.type,
        minutes: schedule.minutes,
        targetTime: targetTime.toISOString()
      };
    });
    
    log('Checking for events in windows:', scheduleWindows);
    
    // Check each reminder schedule
    for (const schedule of REMINDER_SCHEDULES) {
      const registrations = await getUpcomingEventRegistrations(schedule.minutes);
      
      if (registrations.length === 0) {
        log(`No events found needing ${schedule.type} reminders.`);
        continue;
      }

      log(`Found ${registrations.length} registrations needing ${schedule.type} reminders.`, 
        registrations.map(reg => ({
          eventId: reg.event.id,
          eventTitle: reg.event.title,
          eventDate: reg.event.date,
          eventTime: reg.event.time,
          isVirtual: reg.event.isVirtual,
          recipientEmail: reg.email
        })));
      
      for (const reg of registrations) {
        const { name, email, event } = reg;
        try {
          // Call the reminder API endpoint
          const response = await fetch(`${SITE_URL}/api/events/reminder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name, 
              email, 
              event,
              reminderType: schedule.type
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Update the registration to mark reminder as sent
          // Mark reminder as sent after successful email
          await prisma.eventRegistration.update({
            where: { id: reg.id },
            data: {
              reminderSentAt: new Date(),
              lastReminderType: schedule.type
            }
          });

          log(`✅ Reminder sent successfully`, {
            type: schedule.type,
            email,
            eventTitle: event.title,
            eventDate: event.date,
            eventTime: event.time,
            isVirtual: event.isVirtual
          });
        } catch (error) {
          logError(`Failed to send ${schedule.type} reminder`, {
            error,
            email,
            eventTitle: event.title,
            type: schedule.type
          });
        }
      }
    }
  } catch (error) {
    logError('Error in sendReminders', error);
  }
}

process.on('uncaughtException', (error) => {
  logError('Uncaught Exception', error);
});

process.on('unhandledRejection', (reason) => {
  logError('Unhandled Rejection', reason);
});

log('Starting event reminder service...');

// Run the job every 5 minutes
scheduleJob('*/5 * * * *', async () => {
  log('Running scheduled reminder check');
  await sendReminders();
});

// Initial run to check for any pending reminders
sendReminders().catch((error) => logError('Error in initial reminder check', error));
