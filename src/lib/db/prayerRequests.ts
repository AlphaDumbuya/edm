import prisma from './prisma';
import { Prisma } from '@prisma/client';

export interface GetAllPrayerRequestsOptions {
  search?: string;
  category?: string;
  published?: boolean;
  offset?: number;
  limit?: number;
  orderBy?: {
    createdAt?: 'asc' | 'desc';
  };
  published?: boolean; // Added published filter
}

export async function getAllPrayerRequests(options?: GetAllPrayerRequestsOptions) {
  try {
    const where: Prisma.PrayerRequestWhereInput = {};

    if (options?.search) {
      where.OR = [
        {
          title: {
            contains: options.search,
            mode: 'insensitive'
          }
        },
        {
          body: {
            contains: options.search,
            mode: 'insensitive'
          }
        }
      ];
    }

    if (options?.published !== undefined) {
      where.published = options.published;
    }

    if (options?.category) {
      where.category = options.category;
    }

    if (typeof options?.published === 'boolean') {
      where.published = options.published;
    }

    const [prayerRequests, totalCount] = await prisma.$transaction([
      prisma.prayerRequest.findMany({
        where,
        skip: options?.offset,
        take: options?.limit,
        orderBy: options?.orderBy || { createdAt: 'desc' },
      }),
      prisma.prayerRequest.count({ where }),
    ]);

    return { prayerRequests, totalCount };
  } catch (error) {
    console.error('Error fetching prayer requests:', error);
    throw new Error('Failed to fetch prayer requests: ' + (error instanceof Error ? error.message : String(error)));
  }
}

export async function getPrayerRequestById(id: string) {
  try {
    const prayerRequest = await prisma.prayerRequest.findUnique({
      where: { id },
    });
    return prayerRequest;
  } catch (error) {
    console.error(`Error fetching prayer request with ID ${id}:`, error);
    throw new Error(`Failed to fetch prayer request with ID ${id}.`);
  }
}

export async function createPrayerRequest(data: {
  title: string;
  body: string;
  authorName?: string;
  authorEmail?: string;
}) {
  try {
    const newPrayerRequest = await prisma.prayerRequest.create({
      data: {
        ...data
      },
    });
    return newPrayerRequest;
  } catch (error) {
    console.error('Error creating prayer request:', error);
    throw new Error('Failed to create prayer request.');
  }
}

export async function updatePrayerRequest(
  id: string,
  data: {
    title?: string;
    body?: string;
    authorName?: string;
    authorEmail?: string;
    published?: boolean;
    category?: string;
  },
) {
  try {
    const updatedPrayerRequest = await prisma.prayerRequest.update({
      where: { id },
      data,
    });
    return updatedPrayerRequest;
  } catch (error) {
    console.error(`Error updating prayer request with ID ${id}:`, error);
    throw new Error(`Failed to update prayer request with ID ${id}.`);
  }
}

export async function deletePrayerRequest(id: string) {
  try {
    await prisma.prayerRequest.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting prayer request with ID ${id}:`, error);
    throw new Error(`Failed to delete prayer request with ID ${id}.`);
  }
}

export async function getPrayerRequestCount() {
  try {
    const count = await prisma.prayerRequest.count();
    return count;
  } catch (error) {
    console.error("Error getting prayer request count:", error);
    throw error;
  }
}