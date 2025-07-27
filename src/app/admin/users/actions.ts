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
    // Check for all associated content
    const [blogPosts, newsArticles, auditLogs, notifications] = await Promise.all([
      prisma.blogPost.findMany({
        where: { authorId: userId },
        select: { id: true }
      }),
      prisma.newsArticle.findMany({
        where: { authorId: userId },
        select: { id: true }
      }),
      prisma.auditLog.findMany({
        where: { userId: userId },
        select: { id: true }
      }),
      prisma.notification.findMany({
        where: { userId: userId },
        select: { id: true }
      })
    ]);

    const dependencies = [];
    if (blogPosts.length > 0) dependencies.push('blog posts');
    if (newsArticles.length > 0) dependencies.push('news articles');
    if (auditLogs.length > 0) dependencies.push('audit logs');
    if (notifications.length > 0) dependencies.push('notifications');

    if (dependencies.length > 0) {
      const items = dependencies.join(', ');
      return {
        success: false,
        error: `Cannot delete user because they have associated ${items}. Please reassign or delete these items first.`
      };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return { 
        success: false, 
        error: 'Cannot delete user because they have associated content that was not detected. Please contact support.' 
      };
    }
    return { success: false, error: 'Failed to delete user' };
  }
}