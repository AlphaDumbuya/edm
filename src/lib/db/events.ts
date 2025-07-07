import prisma from '../db/prisma'; // Assuming your prisma client is exported as default
// import { Event } from '@prisma/client'; // Removed because 'Event' is not exported from '@prisma/client'

export interface CreateEventInput {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  imageUrl?: string; // Add imageUrl as optional
  isVirtual?: boolean; // Add isVirtual as optional
  onlineLink?: string; // Add onlineLink as optional
}

export async function getAllEvents(options?: {
  search?: string;
  offset?: number;
  limit?: number;
  orderBy?: any; // Consider defining a more specific type
}) {
  try {
    const { search, offset, limit, orderBy } = options || {};

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    console.log('getAllEvents - limit:', limit);
    console.log('getAllEvents - search:', search);
    console.log('getAllEvents - offset:', offset);
    console.log('getAllEvents - limit:', limit);
    console.log('getAllEvents - where:', where);
    const [events, totalEvents] = await prisma.$transaction([
      prisma.event.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy,
      }),
      prisma.event.count({
        where,
      }),
    ]);
    // Add console log for fetched events count
    console.log('getAllEvents - fetched events count:', events.length);
    console.log('getAllEvents - fetched events count:', events.length);

    return { events, totalEvents };
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events.');
  }
}

export async function getEventById(id: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    return event;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw new Error(`Failed to fetch event with ID ${id}.`);
  }
}

export async function createEvent(data: CreateEventInput) {
  try {
    const newEvent = await prisma.event.create({
      data,
    });
    return newEvent;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event.');
  }
}

export async function updateEvent(
  id: string,
  data: Partial<CreateEventInput>,
) {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data,
    });
    return updatedEvent;
  } catch (error) {
    console.error(`Error updating event with ID ${id}:`, error);
    throw new Error(`Failed to update event with ID ${id}.`);
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw new Error(`Failed to delete event with ID ${id}.`);
  }
}

export async function getEventCount() {
  try {
    const count = await prisma.event.count();
    return count;
  } catch (error) {
    console.error("Error getting event count:", error);
    throw error;
  }
}