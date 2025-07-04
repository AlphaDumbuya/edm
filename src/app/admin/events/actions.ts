'use server'; // This marks the file as server-only code

import { createAuditLogEntry } from '@/lib/db/auditLogs';
import { getAllEvents, createEvent, deleteEvent, updateEvent } from '@/lib/db/events';
import { redirect } from 'next/navigation';

// Create Event Action
export async function createEventAction(formData: FormData) {
  // Get userId from formData (must be passed from client)
  const userId = formData.get('userId') as string;
  if (!userId) {
    throw new Error('User not authenticated.');
  }
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateString = formData.get('date') as string;
  const time = formData.get('time') as string;
  const location = formData.get('location') as string;

  if (!title || !description || !dateString || !time || !location) {
    console.error('Missing required fields');
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
      userId: userId,
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
export async function deleteEventAction(id: string, userId: string) {
  // userId must be provided by the caller (from session, context, or props)
  if (!userId) {
    throw new Error('User not authenticated.');
  }
  try {
    await deleteEvent(id);
    await createAuditLogEntry({
      userId,
      action: 'Deleted Event',
      entityType: 'Event',
    });
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw new Error(`Failed to delete event with ID ${id}.`);
  }
}

// Update Event Action
export async function updateEventAction(id: string, formData: FormData, userId: string) {
  // userId must be provided by the caller (from session, context, or props)
  if (!userId) {
    throw new Error('User not authenticated.');
  }
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
      userId,
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
  // This action will be used for the initial load and should return all events for the server component.
  // Client-side pagination and search will use getPaginatedEventsAction.
  try {
    const events = await getAllEvents();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events.');
  }
}

// Get Paginated Events Action for client-side fetching
export async function getPaginatedEventsAction(page: number, search: string) {
  const itemsPerPage = 10; // Define items per page consistently
  try {
    const events = await getAllEvents({ search, limit: itemsPerPage, offset: (page - 1) * itemsPerPage });
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events.');
  }
}
