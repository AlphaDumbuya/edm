'use server'; // This marks the file as server-only code

import { createAuditLogEntry } from '@/lib/db/auditLogs';
import { createEvent, deleteEvent } from "@/lib/db/events";
import { redirect } from 'next/navigation';

// Define the type for the event data expected by createEvent

export async function createEventAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateString = formData.get('date') as string;
  const time = formData.get('time') as string;
  const location = formData.get('location') as string;

  // Basic validation (you'll want more robust validation)
  if (!title || !description || !dateString || !time || !location) {
    // In a real application, you'd handle this with form state or a message
    console.error("Missing required fields");
    return;
  }

  try {
    // Assuming the date string is in a format that the Date constructor can parse
    // You might need more robust date handling depending on your date input
    const date = new Date(dateString);
/*
    const eventData: CreateEventData = {
      title,
      description,
      date,
      time,
      location,
    });

    await createEvent(eventData); */
    await createEvent({
      title,
      description,
      date,
      time,
      location,
    });

    // Replace 'YOUR_USER_ID' with logic to get the current user's ID
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID', 
      action: 'Created Event',
      entityType: 'Event',
    });

    // Redirect to the events list page after successful creation
    redirect('/admin/events');

  } catch (error) {
    console.error('Error creating event:', error);
    // In a real application, you'd handle this with error messages
    throw new Error('Failed to create event.');
  }
}

export async function deleteEventAction(id: string) {
  try {
    await deleteEvent(id);

    // Replace 'YOUR_USER_ID' with logic to get the current user's ID
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID', 
      action: 'Deleted Event',
      entityType: 'Event',
    });
    // Optionally revalidate path or return success status
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    // In a real application, you'd handle this with error messages
    throw new Error(`Failed to delete event with ID ${id}.`);
  }
}

export async function updateEventAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateString = formData.get('date') as string;
  const time = formData.get('time') as string;
  const location = formData.get('location') as string;

  // Prepare data for update, only include fields that are present
  const updateData: {
    title?: string;
    description?: string;
    date?: Date;
    time?: string;
    location?: string;
  } = {};

  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (dateString) updateData.date = new Date(dateString); // Assuming date string is parseable
  if (time) updateData.time = time;
  if (location) updateData.location = location;

  try {
    await deleteEvent(id);
    redirect('/admin/events'); // Redirect to the events list page after successful update
  } catch (error) {
    console.error(`Error updating event with ID ${id}:`, error);
    throw new Error(`Failed to update event with ID ${id}.`);
  }
}