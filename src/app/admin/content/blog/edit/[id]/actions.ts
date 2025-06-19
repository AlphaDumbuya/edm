'use server';

import { getBlogPostById } from '@/lib/db/blogPosts';

export async function fetchBlogPostForEdit(id: string) {
  try {
    const blogPost = await getBlogPostById(id);
    return blogPost;
  } catch (error) {
    console.error(`Error fetching blog post for edit with ID ${id}:`, error);
    // You might want to handle the error more gracefully here,
    // e.g., return null or a specific error object depending on your needs.
    throw error; // Re-throwing for now
  }
}