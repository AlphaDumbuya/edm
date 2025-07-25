'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface GetAllUsersOptions {
  search?: string;
  role?: string;
  offset?: number;
  limit?: number;
  orderBy?: any;
}

export async function getAllUsersAction(options: GetAllUsersOptions) {
  try {
    const where: any = {};
    
    if (options.search) {
      where.OR = [
        { email: { contains: options.search, mode: 'insensitive' } },
        { name: { contains: options.search, mode: 'insensitive' } }
      ];
    }
    
    if (options.role && options.role !== 'all') {
      where.role = options.role;
    }

    // Use a single query with count
    const [users, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: options.offset || 0,
        take: options.limit || 10,
        orderBy: options.orderBy || { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ], {
      isolationLevel: 'ReadUncommitted' // Use a lower isolation level for better performance
    });

    return {
      success: true,
      data: {
        users,
        totalCount
      }
    };
  } catch (error) {
    console.error('Error in getAllUsersAction:', error);
    return {
      success: false,
      error: 'Failed to fetch users'
    };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}