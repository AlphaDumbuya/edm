'use server';
import { 
  createPrayerRequest, 
  deletePrayerRequest, 
  updatePrayerRequest, 
  getAllPrayerRequests, 
  getPrayerRequestById as getPrayerRequestByIdFromDb,
  type GetAllPrayerRequestsOptions 
} from "@/lib/db/prayerRequests";
import { createAuditLogEntry } from '@/lib/db/auditLogs';
import { getCurrentUserId } from '@/lib/auth/session';

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

    // Create audit log entry with real user ID
    const userId = await getCurrentUserId();
    await createAuditLogEntry({
      userId: userId || 'SYSTEM',
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

    // Create audit log entry with real user ID
    const userId = await getCurrentUserId();
    await createAuditLogEntry({
      userId: userId || 'SYSTEM',
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
    const published = formData.get('published') === 'true';
    const category = formData.get('category') as string | null;

    await updatePrayerRequest(id, {
      published,
      category: category || undefined,
    });

    // Create audit log entry with real user ID
    const userId = await getCurrentUserId();
    await createAuditLogEntry({
      userId: userId || 'SYSTEM',
      action: 'Updated Prayer Request',
      entityType: 'PrayerRequest',
      entityId: id,
      details: { published, category },
    });
    return { success: true };
  } catch (error) {
    console.error(`Error updating prayer request with ID ${id}:`, error);
    return { error: `Failed to update prayer request with ID ${id}.` };
  }
}

export async function getAllPrayerRequestsAction(options: GetAllPrayerRequestsOptions = {}) {
  try {
    // Pass the options directly to your getAllPrayerRequests function
    // Assuming getAllPrayerRequests is designed to accept these parameters
    const prayerRequests = await getAllPrayerRequests(options);
    // Note: Your getAllPrayerRequests function in /lib/db/prayerRequests
    // also needs to be updated to accept and utilize these parameters
    return { success: true, data: prayerRequests };
  } catch (error) {
    console.error('Error fetching prayer requests:', error);
    return { error: 'Failed to fetch prayer requests.' };
  }
}

export async function getPrayerRequestByIdAction(id: string) {
  try {
    const prayerRequest = await getPrayerRequestByIdFromDb(id);
    return { success: true, data: prayerRequest };
  } catch (error) {
    console.error(`Error fetching prayer request with ID ${id}:`, error);
    return { error: `Failed to fetch prayer request with ID ${id}.` };
  }
}

