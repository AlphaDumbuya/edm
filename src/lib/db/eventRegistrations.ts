import { prisma } from '../db/prisma';
import { EventReminderService } from '@/lib/services/event-reminder-service.new';

export async function createEventRegistration({ name, email, eventId }: { name: string; email: string; eventId: string }) {
  // Find or create user by email
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword: '', // No password required for event signup
      },
    });
  }

  const registration = await prisma.eventRegistration.create({
    data: {
      name,
      email,
      eventId,
    },
  });

  // Automatically create reminders for this registration using user.id
  await EventReminderService.createRemindersForRegistration(eventId, user.id);

  return registration;
}

export async function getEventRegistrationsForEvent(eventId: string) {
  return prisma.eventRegistration.findMany({
    where: { eventId },
  });
}

export async function getUpcomingEventRegistrations(hoursAhead: number = 1) {
  // Find all registrations for events starting in the next `hoursAhead` hours
  const now = new Date();
  const soon = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);
  return prisma.eventRegistration.findMany({
    where: {
      event: {
        date: {
          gte: now,
          lte: soon,
        },
      },
    },
    include: { event: true },
  });
}
