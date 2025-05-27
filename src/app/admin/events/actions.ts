'use server'; // This marks the file as server-only code

import { createAuditLogEntry } from '@/lib/db/auditLogs';
import { getAllEvents, createEvent, deleteEvent, updateEvent } from '@/lib/db/events';
import { redirect } from 'next/navigation';

// Create Event Action
export async function createEventAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateString = formData.get('date') as string;
  const time = formData.get('time') as string;
  const location = formData.get('location') as string;

  if (!title || !description || !dateString || !time || !location) {
    console.error("Missing required fields");
    return;
  }

  try {
    const date = new Date(dateString);

    await createEvent({
      title,
      description,
      date,
      time,
      location,
    });

    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
      action: 'Created Event',
      entityType: 'Event',
    });

    redirect('/admin/events');

  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event.');
  }
}

// Delete Event Action
export async function deleteEventAction(id: string) {
  try {
    await deleteEvent(id);

    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
      action: 'Deleted Event',
      entityType: 'Event',
    });

  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw new Error(`Failed to delete event with ID ${id}.`);
  }
}

// Update Event Action
export async function updateEventAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateString = formData.get('date') as string;
  const time = formData.get('time') as string;
  const location = formData.get('location') as string;

  const updateData: {
    title?: string;
    description?: string;
    date?: Date;
    time?: string;
    location?: string;
  } = {};

  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (dateString) updateData.date = new Date(dateString);
  if (time) updateData.time = time;
  if (location) updateData.location = location;

  try {
    await updateEvent(id, updateData);

    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
      action: 'Updated Event',
      entityType: 'Event',
    });

    redirect('/admin/events');

  } catch (error) {
    console.error(`Error updating event with ID ${id}:`, error);
    throw new Error(`Failed to update event with ID ${id}.`);
  }
}

// Get All Events Action
export async function getAllEventsAction() {
  try {
    const events = await getAllEvents();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events.');
  }
}
