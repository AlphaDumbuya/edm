import prisma from '@/lib/db/prisma';
import { getEventReminderEmailHtml, getEventReminderEmailText } from '@/emails/event-reminder-template';
import nodemailer from 'nodemailer';
import { format, addMinutes } from 'date-fns';
import { Event, EventRegistration } from '@prisma/client';

type ReminderType = '24h' | '1h' | '30m';

interface ReminderConfig {
  type: ReminderType;
  minutesBeforeEvent: number;
  subject: (eventTitle: string) => string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const REMINDER_CONFIGS: ReminderConfig[] = [
  {
    type: '24h',
    minutesBeforeEvent: 24 * 60,
    subject: (eventTitle) => `Reminder: ${eventTitle} starts in 24 hours`,
  },
  {
    type: '1h',
    minutesBeforeEvent: 60,
    subject: (eventTitle) => `Reminder: ${eventTitle} starts in 1 hour`,
  },
  {
    type: '30m',
    minutesBeforeEvent: 30,
    subject: (eventTitle) => `Reminder: ${eventTitle} starts in 30 minutes`,
  },
];

async function sendReminderEmail(
  registration: EventRegistration,
  event: Event,
  reminderType: ReminderType,
  subject: string
) {
  const timeText = reminderType === '24h' ? '24 hours' : 
                   reminderType === '1h' ? '1 hour' : 
                   '30 minutes';

  const onlineLink = event.onlineLink ?? undefined;

  // Calculate minutes until event starts
  const eventDateTime = new Date(`${format(event.date, 'yyyy-MM-dd')}T${event.time}`);
  const minutesUntilEvent = Math.floor((eventDateTime.getTime() - new Date().getTime()) / (1000 * 60));

  // Include link if it's a virtual event and either:
  // 1. This is the 30-minute reminder, or
  // 2. The event starts in less than 30 minutes
  const shouldIncludeLink = event.isVirtual && (
    reminderType === '30m' || 
    (minutesUntilEvent <= 30 && minutesUntilEvent >= 0)
  );

  const html = getEventReminderEmailHtml({
    name: registration.name,
    eventTitle: event.title,
    eventDate: format(event.date, 'MMMM do, yyyy'),
    eventTime: event.time,
    eventLocation: event.location,
    isVirtual: event.isVirtual,
    onlineLink: shouldIncludeLink ? onlineLink : undefined,
    timeUntilEvent: timeText,
  });

  const text = getEventReminderEmailText({
    name: registration.name,
    eventTitle: event.title,
    eventDate: format(event.date, 'MMMM do, yyyy'),
    eventTime: event.time,
    eventLocation: event.location,
    isVirtual: event.isVirtual,
    onlineLink: shouldIncludeLink ? onlineLink : undefined,
    timeUntilEvent: timeText,
  });

  try {
    const finalSubject = shouldIncludeLink ? `${subject}${event.isVirtual ? ' - Join Link Included' : ''}` : subject;
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: registration.email,
      subject: finalSubject,
      html,
      text,
    });
    console.log(`Sent ${reminderType} reminder email to ${registration.email} for event: ${event.title}`);
  } catch (error) {
    console.error(`Failed to send ${reminderType} reminder email to ${registration.email}:`, error);
  }
}

export async function sendEventReminders() {
  const now = new Date();
  console.log('Running event reminders at:', now.toISOString());
  console.log('SMTP Config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER ? '***' : 'undefined',
    fromName: process.env.EMAIL_FROM_NAME,
  });

  try {
    // Record that we're checking for reminders
    await prisma.auditLog.create({
      data: {
        action: 'CHECK_REMINDERS',
        entityType: 'Event',
        details: { timestamp: now.toISOString() }
      }
    });
    
    // Calculate reminder windows by looking ahead
    const windows = REMINDER_CONFIGS.map(config => {
      // Calculate when events should start based on the current time and reminder window
      const targetEventTime = addMinutes(now, config.minutesBeforeEvent);
      
      // Create a window for finding events
      const window = {
        ...config,
        startTime: targetEventTime,
        endTime: addMinutes(targetEventTime, 5),
      };

      // Debug - Check current event time window
      console.log(`Debug - ${config.type} window:`, {
        targetEventTime: targetEventTime.toISOString(),
        windowStart: window.startTime.toISOString(),
        windowEnd: window.endTime.toISOString(),
      });
      
      console.log(`Calculating ${config.type} reminder window:`, {
        now: format(now, 'yyyy-MM-dd HH:mm:ss'),
        targetEventTime: format(targetEventTime, 'yyyy-MM-dd HH:mm:ss'),
        windowStart: format(window.startTime, 'yyyy-MM-dd HH:mm:ss'),
        windowEnd: format(window.endTime, 'yyyy-MM-dd HH:mm:ss'),
        minutesBeforeEvent: config.minutesBeforeEvent
      });
      
      return window;
    });

    // Find events for each reminder window
    for (const window of windows) {
      console.log(`Processing ${window.type} reminders`);
      
      const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

      interface DbEvent extends Event {
        regId?: string;
        regName?: string;
        regEmail?: string;
      }

      console.log('Debug - Window params:', {
        type: window.type,
        minutesBeforeEvent: window.minutesBeforeEvent,
        startTime: window.startTime.toISOString(),
        endTime: window.endTime.toISOString()
      });

      // Find events that need reminders using a raw SQL query for precise datetime handling
      const eventRows = await prisma.$queryRaw<DbEvent[]>`
        WITH event_times AS (
          SELECT 
            e.*,
            (e.date::date + e.time::time)::timestamp as event_datetime
          FROM "Event" e
          WHERE e.id NOT IN (
            SELECT "eventId" FROM "SentReminder"
            WHERE "type" = ${window.type}
            AND "createdAt" >= ${todayStart}
          )
        )
        SELECT 
          e.*,
          er.id as "regId",
          er.name as "regName",
          er.email as "regEmail"
        FROM event_times et
        JOIN "Event" e ON e.id = et.id
        LEFT JOIN "EventRegistration" er ON e.id = er."eventId"
        WHERE 
          event_datetime >= (NOW() + interval '${window.minutesBeforeEvent} minutes')::timestamp
          AND event_datetime < (NOW() + interval '${window.minutesBeforeEvent + 5} minutes')::timestamp
      `;
      
      // Group registrations by event
      const events: { [key: string]: Event & { eventRegistrations: EventRegistration[] } } = {};
      for (const row of eventRows) {
        const { regId, regName, regEmail, ...event } = row;
        if (!events[event.id]) {
          events[event.id] = { ...event, eventRegistrations: [] };
        }
        if (regId && regName && regEmail) {
          events[event.id].eventRegistrations.push({
            id: regId,
            name: regName,
            email: regEmail,
            eventId: event.id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }

      const eventsArray = Object.values(events);
      console.log(`Found ${eventsArray.length} events to check for ${window.type} reminders`);

      // Log each found event's details
      eventsArray.forEach(event => {
        const eventTime = new Date(`${format(event.date, 'yyyy-MM-dd')}T${event.time}`);
        console.log('Found event needing reminders:', {
          title: event.title,
          date: format(event.date, 'yyyy-MM-dd'),
          time: event.time,
          eventTime: format(eventTime, 'yyyy-MM-dd HH:mm:ss'),
          isVirtual: event.isVirtual,
          registrations: event.eventRegistrations.length
        });
      });

      // Send reminders for each event
      for (const event of eventsArray) {
        console.log(`Processing ${window.type} reminders for event: ${event.title}`);

        try {
          // Create a new reminder record first
          await prisma.$executeRaw`
            INSERT INTO "SentReminder" ("id", "eventId", "type", "createdAt", "updatedAt")
            SELECT gen_random_uuid(), ${event.id}, ${window.type}, NOW(), NOW()
            WHERE NOT EXISTS (
              SELECT 1 FROM "SentReminder"
              WHERE "eventId" = ${event.id}
              AND "type" = ${window.type}
              AND "createdAt" >= ${todayStart}
            )
          `;

          // Then send emails to all registrants
          for (const registration of event.eventRegistrations) {
            await sendReminderEmail(
              registration,
              event,
              window.type,
              window.subject(event.title)
            );
          }
        } catch (error) {
          console.error(`Failed to process reminders for event ${event.title}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error in sendEventReminders:', error);
  }

  console.log('Finished checking for event reminders');
}
