import * as schedule from 'node-schedule';
import { prisma } from '@/lib/db/prisma';
import { sendEventReminderEmail } from '@/lib/email/sendEventReminderEmail';
import type { ReminderType } from '@/types/reminder';
import type { Prisma } from '@prisma/client';

type EventRegistrationWithEvent = Prisma.EventRegistrationGetPayload<{
  include: { event: true }
}>;

export class EventReminderService {
  // Configure logging
  private static log(message: string, data?: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  }

  private static logError(message: string, error: any) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`);
    console.error(error);
  }

  private static REMINDER_SCHEDULES = [
    { minutes: 60, type: '1hour' },    // 1 hour before
    { minutes: 1440, type: '1day' },   // 24 hours before
    { minutes: 10080, type: '1week' }  // 1 week before
  ];

  static async processReminders() {
    try {
      const now = new Date();
      this.log('Starting reminder check');
      
      const scheduleWindows = this.REMINDER_SCHEDULES.map(schedule => ({
        type: schedule.type,
        minutes: schedule.minutes,
        targetTime: new Date(now.getTime() + schedule.minutes * 60 * 1000).toISOString()
      }));
      
      this.log('Checking for events in windows:', scheduleWindows);
      
      for (const schedule of this.REMINDER_SCHEDULES) {
        const registrations = await this.getUpcomingEventRegistrations(schedule.minutes);
        
        if (registrations.length === 0) {
          this.log(`No events found needing ${schedule.type} reminders.`);
          continue;
        }

        this.log(`Found ${registrations.length} registrations needing ${schedule.type} reminders.`);
        
        for (const reg of registrations) {
          const { name, email, event } = reg;
          try {
            await sendEventReminderEmail({ 
              name, 
              email, 
              event,
              reminderType: schedule.type as '1hour' | '1day' | '1week'
            });

            await prisma.eventRegistration.update({
              where: { id: reg.id },
              data: {
                reminderSentAt: new Date(),
                lastReminderType: schedule.type
              } as Prisma.EventRegistrationUpdateInput
            });

            this.log(`✅ Reminder sent successfully`, {
              type: schedule.type,
              email,
              eventTitle: event.title,
              eventDate: event.date,
              eventTime: event.time,
              isVirtual: event.isVirtual
            });
          } catch (error) {
            this.logError(`Failed to send ${schedule.type} reminder`, error);
          }
        }
      }
    } catch (error) {
      this.logError('Error in processReminders', error);
    }
  }

  static async getUpcomingEventRegistrations(minutesAhead: number = 60): Promise<EventRegistrationWithEvent[]> {
    const now = new Date();

    const registrations = await prisma.eventRegistration.findMany({
      where: {
        AND: [
          // Only get active registrations
          { status: 'REGISTERED' as const },
          // Only get registrations that haven't received this type of reminder yet
          {
            OR: [
              { reminderSentAt: null },
              { 
                AND: [
                  { reminderSentAt: { not: null } },
                  { lastReminderType: { not: minutesAhead === 60 ? '1hour' : minutesAhead === 1440 ? '1day' : '1week' } }
                ]
              }
            ]
          },
          // Event must be in the future
          {
            event: {
              date: {
                gte: new Date(now.toISOString().split('T')[0])
              }
            }
          }
        ]
      } as Prisma.EventRegistrationWhereInput,
      include: { 
        event: true 
      }
    });

    // Filter events based on their actual date and time
    return registrations.filter(reg => {
      const eventDate = new Date(reg.event.date);
      const [hours, minutes] = reg.event.time.split(':').map(Number);
      eventDate.setHours(hours, minutes, 0, 0);
      
      const diffInMinutes = (eventDate.getTime() - now.getTime()) / (60 * 1000);
      
      // Log the time difference for debugging
      this.log(`Event ${reg.event.title} is ${diffInMinutes} minutes away`);
      
      // For any reminder type: if the event is happening within the next 60 minutes
      // send the reminder regardless of the exact timing window
      if (diffInMinutes <= 60) {
        return true;
      }
      
      // Otherwise use more lenient time windows:
      // For 1-hour reminders: between now and 90 minutes from now
      // For 1-day reminders: between 22-26 hours from now
      // For 1-week reminders: between 6.8-7.2 days from now
      if (minutesAhead === 60) {
        return diffInMinutes > 0 && diffInMinutes <= 90;
      } else if (minutesAhead === 1440) {
        return diffInMinutes > 1320 && diffInMinutes <= 1560;
      } else {
        return diffInMinutes > 9792 && diffInMinutes <= 10368;
      }
    });
  }

  static startScheduledJob() {
    // Run the job every 5 minutes
    schedule.scheduleJob('*/5 * * * *', async () => {
      this.log('Running scheduled reminder check');
      await this.processReminders();
    });

    // Initial run
    this.processReminders().catch((error) => this.logError('Error in initial reminder check', error));
  }
}
