'use server';

import { createPrayerRequest, deletePrayerRequest, updatePrayerRequest } from "@/lib/db/prayerRequests";
import { createAuditLogEntry } from '@/lib/db/auditLogs';

export async function createPrayerRequestAction(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const authorName = formData.get('authorName') as string | null;
    const authorEmail = formData.get('authorEmail') as string | null;

    await createPrayerRequest({
      title,
      body,
      authorName: authorName || undefined, // Handle optional fields
      authorEmail: authorEmail || undefined, // Handle optional fields
    });

    // Create audit log entry (replace 'YOUR_USER_ID' with actual logic)
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
      action: 'Created Prayer Request',
      entityType: 'PrayerRequest',
      details: { title, authorName },
    });
    // You might want to return a success message or object here
    return { success: true };

  } catch (error) {
    console.error('Error creating prayer request:', error);
    // You might want to return an error message or object here
    return { error: 'Failed to create prayer request.' };
  }
}

export async function deletePrayerRequestAction(id: string) {
  try {
    await deletePrayerRequest(id);

    // Create audit log entry (replace 'YOUR_USER_ID' with actual logic)
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
      action: 'Deleted Prayer Request',
      entityType: 'PrayerRequest',
      entityId: id,
    });
    return { success: true };
  } catch (error) {
    console.error(`Error deleting prayer request with ID ${id}:`, error);
    return { error: `Failed to delete prayer request with ID ${id}.` };
  }
}

export async function updatePrayerRequestAction(id: string, formData: FormData) {
  try {
    const status = formData.get('status') as string;

    await updatePrayerRequest(id, {
      status,
    });

    // Create audit log entry (replace 'YOUR_USER_ID' with actual logic)
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
      action: 'Updated Prayer Request',
      entityType: 'PrayerRequest',
      entityId: id,
      details: { status },
    });
    return { success: true };
  } catch (error) {
    console.error(`Error updating prayer request with ID ${id}:`, error);
    return { error: `Failed to update prayer request with ID ${id}.` };
  }
}