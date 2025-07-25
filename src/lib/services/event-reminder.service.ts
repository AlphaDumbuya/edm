import { prisma } from '@/lib/db/prisma';
import { formatEventTime } from '@/lib/utils/date';
import { sendEmail } from '@/lib/email/sendEmail';
import { ReminderStatus } from '@prisma/client';

export class EventReminderService {
  static async createRemindersForRegistration(eventId: string, userId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { registrations: true }
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const eventDate = new Date(event.date);
    
    // Create reminders for different time intervals
    const reminderTimes = [
      { type: '24h', hours: 24 },
      { type: '1h', hours: 1 },
      { type: '30m', minutes: 30 }
    ];

    for (const reminder of reminderTimes) {
      const scheduledFor = new Date(eventDate);
      if (reminder.hours) {
        scheduledFor.setHours(scheduledFor.getHours() - reminder.hours);
      }
      if (reminder.minutes) {
        scheduledFor.setMinutes(scheduledFor.getMinutes() - reminder.minutes);
      }

      // Only create reminder if it's in the future
      if (scheduledFor > new Date()) {
        await prisma.eventReminder.create({
          data: {
            eventId,
            userId,
            type: reminder.type,
            scheduledFor,
            status: 'PENDING'
          }
        });
      }
    }
  }

  static async processReminders() {
    const now = new Date();
    const pendingReminders = await prisma.eventReminder.findMany({
      where: {
        status: 'PENDING',
        scheduledFor: {
          lte: now
        }
      },
      include: {
        event: true,
        user: true
      }
    });

    for (const reminder of pendingReminders) {
      try {
        const { event, user } = reminder;
        
        // Skip if event has passed
        if (new Date(event.date) < now) {
          await this.markReminderAs(reminder.id, 'FAILED', 'Event has already passed');
          continue;
        }

        // Prepare email content
        const emailContent = this.getEmailContent(reminder.type, {
          eventTitle: event.title,
          eventDate: formatEventTime(event.date),
          userName: user.name || 'Participant',
          eventLocation: event.location,
          isVirtual: event.isVirtual,
          onlineLink: event.onlineLink
        });

        // Send email
        await sendEmail({
          to: user.email,
          subject: `${reminder.type} Reminder: ${event.title}`,
          html: emailContent,
          text: emailContent.replace(/<[^>]*>/g, '')
        });

        // Mark as sent
        await this.markReminderAs(reminder.id, 'SENT');
      } catch (error) {
        console.error(`Failed to process reminder ${reminder.id}:`, error);
        await this.markReminderAs(reminder.id, 'FAILED', error.message);
      }
    }
  }

  private static async markReminderAs(
    reminderId: string, 
    status: ReminderStatus, 
    error?: string
  ) {
    await prisma.eventReminder.update({
      where: { id: reminderId },
      data: {
        status,
        error,
        sentAt: status === 'SENT' ? new Date() : undefined,
        updatedAt: new Date()
      }
    });
  }

  private static getEmailContent(
    reminderType: string,
    { eventTitle, eventDate, userName, eventLocation, isVirtual, onlineLink }: any
  ) {
    const timeUntil = reminderType === '24h' ? '24 hours' : 
                      reminderType === '1h' ? '1 hour' : 
                      '30 minutes';

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Event Reminder: ${eventTitle}</h2>
        <p>Hello ${userName},</p>
        <p>This is a reminder that your event starts in ${timeUntil}.</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Event:</strong> ${eventTitle}</p>
          <p><strong>Date & Time:</strong> ${eventDate}</p>
          ${isVirtual 
            ? `<p><strong>Online Link:</strong> ${onlineLink}</p>` 
            : `<p><strong>Location:</strong> ${eventLocation}</p>`}
        </div>
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br>EDM Team</p>
      </div>
    `;
  }
}
