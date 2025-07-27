// src/lib/db/blog.ts
import prisma from './prisma';
import { BlogPost } from '@prisma/client';

// Define a simplified BlogPost type for application use if needed
export type AppBlogPost = Omit<BlogPost, 'authorId'> & {
  authorName?: string | null;
};

export async function getAllBlogPosts(publishedOnly?: boolean): Promise<AppBlogPost[]> {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      select: {
        id: true,
        title: true,
        slug: true,
        content: true, // Include content
        imageUrl: true, // Include imageUrl
        createdAt: true,
        updatedAt: true,
        published: true,
        tags: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return blogPosts.map(post => ({
      ...post,
      authorName: post.author?.name,
      author: undefined, // Remove the nested author object
    }));
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
}

export async function deleteBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const blogPost = await prisma.blogPost.delete({
      where: { id },
    });
    return blogPost;
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id}:`, error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
      include: { // Include author details if needed for display/editing
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });
    return blogPost;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    return null;
  }
}

interface CreateBlogPostData {
  title: string;
  slug: string;
  content: string;
  authorId: string; // Assuming authorId is required on creation
  published?: boolean;
  imageUrl?: string; // Add imageUrl for cover image support
}

export async function createBlogPost(data: CreateBlogPostData): Promise<BlogPost | null> {
  try {
    const { authorId, imageUrl, ...rest } = data;
    const blogPost = await prisma.blogPost.create({
      data: {
        ...rest,
        imageUrl: imageUrl || null,
        author: { connect: { id: authorId } },
      },
    });
    return blogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

interface UpdateBlogPostData {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
  authorId?: string;
  imageUrl?: string | null; // Add imageUrl for update
}

export async function updateBlogPost(id: string, data: UpdateBlogPostData): Promise<BlogPost | null> {
  try {
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
      },
    });
    return blogPost;
  } catch (error) {
    console.error(`Error updating blog post with ID ${id}:`, error);
    return null;
  }
}