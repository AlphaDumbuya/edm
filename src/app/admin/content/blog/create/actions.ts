'use server';

import prisma from '@/lib/db/prisma';
import { decrypt } from '@/lib/auth/session';
import { headers } from 'next/headers';

// Helper function to extract a cookie value from the Cookie header
function getCookieValue(cookieHeader: string, name: string): string | null {
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return null;
}

export async function createBlogPostAction(formData: FormData) {
  console.log('createBlogPostAction: Function started');

  // 1. Extract data from formData
  const title = formData.get('title')?.toString().trim();
  const slug = formData.get('slug')?.toString().trim();
  const content = formData.get('content')?.toString().trim();
  const published = formData.get('published') === 'on';

  // 2. Validate required fields
  if (!title || !slug || !content) {
    console.error('Validation Error: Missing required fields');
    return { error: 'Missing required fields' };
  }

  try {
    // 3. Check for existing slug
    const existingBlogPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingBlogPost) {
      console.error(`Validation Error: Slug "${slug}" already exists.`);
      return { error: 'Slug already exists. Please use a different slug.' };
    }
  } catch (error) {
    console.error('Error checking for existing slug:', error);
    return { error: 'Error checking for slug existence.' };
  }

  try {
    // 4. Get session from cookie
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie');

    if (!cookieHeader) {
      return { error: 'Session cookie not found' };
    }

    const sessionCookie = getCookieValue(cookieHeader, 'session');

    if (!sessionCookie) {
      return { error: 'Session cookie not found' };
    }

    const session = await decrypt(sessionCookie);

    if (!session || !session.userId) {
      return { error: 'User not authenticated' };
    }

    const authorId = session.userId;

    // 5. Create the blog post
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        published,
        authorId,
      },
    });

    console.log('Blog post created successfully:', newPost);
    return { success: true, post: newPost };

  } catch (error) {
    console.error('Error creating blog post:', error);
    return { error: 'Failed to create blog post' };
  }
}
