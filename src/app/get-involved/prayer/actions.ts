'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPublicPrayerRequest(data: {
  request: string;
  authorName?: string | null;
  authorEmail?: string | null;
  isPublic?: boolean;
}) {
  try {
    const formattedPrayerRequestData = {
      title: `Prayer Request - ${data.request.substring(0, 20)}...`, // Generate a default title
      body: data.request, // Map request to body
      status: data.isPublic ? 'Public' : 'Private', // Map isPublic to status
      ...(data.authorName !== null && data.authorName !== undefined && { authorName: data.authorName }),
      ...(data.authorEmail !== null && data.authorEmail !== undefined && { authorEmail: data.authorEmail }),
    };

    // Assuming createPrayerRequest is a function that interacts with your database/backend
    // Replace with your actual implementation
    // For example:
    const newRequest = await prisma.prayerRequest.create({ data: formattedPrayerRequestData as any }); // Added type assertion for now

    console.log('Creating public prayer request with data:', formattedPrayerRequestData);
    // Simulate a database creation delay and return a mock object
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // const mockCreatedRequest = {
    //   id: 'mock-id-' + Date.now(),
    //   ...formattedPrayerRequestData,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };

    // Revalidate the prayer page path to show the new request
    revalidatePath('/get-involved/prayer');

    return newRequest; // Return the created request or a success indicator

  } catch (error) {
    console.error('Error creating public prayer request:', error);
    throw new Error('Failed to create public prayer request.');
  }
}