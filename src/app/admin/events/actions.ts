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
  const timezone = formData.get('timezone') as string;
  const location = formData.get('location') as string;
  const imageUrl = formData.get('imageUrl') as string | null;
  const isVirtualRaw = formData.get('isVirtual');
  const isVirtual = isVirtualRaw === 'true';
  const onlineLink = formData.get('onlineLink') as string | undefined;

  if (!title || !description || !dateString || !time || !timezone || (!isVirtual && !location)) {
    throw new Error('Missing required fields: title, description, date, time, timezone, or location (if not virtual).');
  }

  try {
    // Create a Date object with the correct date and time in the specified timezone
    // Convert to UTC for storage
    const eventDate = new Date(dateString + 'T' + time);
    const timeZoneOffset = new Date(eventDate.toLocaleString('en-US', { timeZone: timezone })).getTimezoneOffset();
    eventDate.setMinutes(eventDate.getMinutes() - timeZoneOffset);
    
    await createEvent({
      title,
      description,
      date: eventDate,
      time,
      location,
      ...(imageUrl ? { imageUrl } : {}),
      isVirtual,
      ...(isVirtual && onlineLink ? { onlineLink } : {}),
    });

    await createAuditLogEntry({
      userId: userId,
      action: 'Created Event',
      entityType: 'Event',
    });

    // Revalidate the events page
    try {
      const revalidateRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/events&secret=${process.env.REVALIDATION_SECRET}`);
      if (!revalidateRes.ok) {
        console.error('Failed to revalidate events page:', await revalidateRes.text());
      }
    } catch (revalidateError) {
      console.error('Error revalidating events page:', revalidateError);
    }

    // Removed redirect('/admin/events') to avoid NEXT_REDIRECT error
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
  const imageUrl = formData.get('imageUrl') as string | null;
  const isVirtualRaw = formData.get('isVirtual');
  const isVirtual = isVirtualRaw === 'true';
  const onlineLink = formData.get('onlineLink') as string | undefined;

  const updateData: {
    title?: string;
    description?: string;
    date?: Date;
    time?: string;
    location?: string;
    imageUrl?: string;
    isVirtual?: boolean;
    onlineLink?: string;
  } = {};

  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (dateString && time) {
    // Create a Date object with the correct date and time, using the local timezone
    const eventDate = new Date(dateString + 'T' + time + '+00:00');
    updateData.date = eventDate;
    updateData.time = time;
  }
  if (location) updateData.location = location;
  if (imageUrl !== undefined && imageUrl !== null) updateData.imageUrl = imageUrl;
  updateData.isVirtual = isVirtual;
  if (isVirtual && onlineLink) {
    updateData.onlineLink = onlineLink;
  } else {
    updateData.onlineLink = undefined;
  }

  try {
    await updateEvent(id, updateData);
    await createAuditLogEntry({
      userId,
      action: 'Updated Event',
      entityType: 'Event',
    });
    // Removed redirect('/admin/events') to avoid NEXT_REDIRECT error
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
