import prisma from '../db/prisma';

export async function createEventRegistration({ name, email, eventId }: { name: string; email: string; eventId: string }) {
  return prisma.eventRegistration.create({
    data: {
      name,
      email,
      eventId,
    },
  });
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
