'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPublicPrayerRequest(data: {
  request: string;
  authorName?: string | null;
  authorEmail?: string | null;
  isPublic?: boolean;
  category?: string | null;
}) {
  try {
    if (!data.request || typeof data.request !== 'string' || data.request.trim() === '') {
      throw new Error('Prayer request text is required.');
    }
    const formattedPrayerRequestData: any = {
      title: `Prayer Request - ${data.request.substring(0, 20)}...`, // Generate a default title
      body: data.request, // Map request to body
      published: true, // Always published for public wall
      ...(data.authorName !== null && data.authorName !== undefined && { authorName: data.authorName }),
      ...(data.authorEmail !== null && data.authorEmail !== undefined && { authorEmail: data.authorEmail }),
      ...(data.category && { category: data.category }), // Save category if present
    };

    const newRequest = await prisma.prayerRequest.create({ data: formattedPrayerRequestData as any });

    console.log('Creating public prayer request with data:', formattedPrayerRequestData);

    revalidatePath('/get-involved/prayer');

    return newRequest;
  } catch (error) {
    console.error('Error creating public prayer request:', error);
    throw new Error('Failed to create public prayer request.');
  }
}