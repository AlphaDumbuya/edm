'use server';

import { createPrayerRequest } from '@/lib/db/prayerRequests';
import { PrayerRequestData } from '@/types/prayerRequest';

export async function submitPublicPrayerRequestAction(request: PrayerRequestData) {
  try {
    // Call the database function to create the prayer request
    const newPrayerRequest = await createPrayerRequest({
      title: 'Public Prayer Request',
      body: request.request, // Use the 'request' field as the body
      authorName: request.name,
      authorEmail: request.email,
      status: 'Pending',
    });

    console.log('Public prayer request submitted:', newPrayerRequest);

    // Optionally, you could return the newly created prayer request or a success status
    // return newPrayerRequest;
  } catch (error) {
    console.error('Error submitting public prayer request:', error);
    throw new Error('Failed to submit prayer request.');
  }
}
