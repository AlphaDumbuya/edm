'use server';

import { createPrayerRequest } from '@/lib/db/prayerRequests'; // Assuming createPrayerRequest exists
import { PrayerRequestData } from '@/types/prayerRequest'; // Assuming you have a type for PrayerRequestData

export async function submitPublicPrayerRequestAction(request: PrayerRequestData) {
  try {
    // Call the database function to create the prayer request
    const newPrayerRequest = await createPrayerRequest({
 title: 'Public Prayer Request', // Add a title
      authorName: request.name,
      authorEmail: request.email,
      isPublic: true, // Mark as public
      status: 'Pending', // Set initial status
    });

    console.log('Public prayer request submitted:', newPrayerRequest);

    // Optionally, you could return the newly created prayer request or a success status
    // return newPrayerRequest;

  } catch (error) {
    console.error('Error submitting public prayer request:', error);
    // You might want to throw an error or return an error status
    throw new Error('Failed to submit prayer request.');
  }
}
