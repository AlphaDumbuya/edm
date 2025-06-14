'use server';

import { getAllBlogPosts } from '@/lib/db/blogPosts';

export async function fetchBlogPosts(searchQuery: string, offset: number, limit: number) {
  try {
    const data = await getAllBlogPosts({ search: searchQuery, offset, limit });
    return { blogPosts: data.blogPosts, totalCount: data.totalCount };
  } catch (error: any) {
    console.error('Error fetching blog posts in server action:', error);
    // You might want to return an error indicator or throw the error
    throw new Error('Failed to fetch blog posts.');
  }
}