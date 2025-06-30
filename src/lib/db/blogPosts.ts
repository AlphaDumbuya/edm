import { Prisma } from '@prisma/client';
import prisma from '../db/prisma';

export async function getAllBlogPosts(options?: {
  search?: string;
  offset?: number;
  limit?: number;
  orderBy?: { [key: string]: 'asc' | 'desc' };
}) {
  const { search, offset, limit, orderBy } = options || {};

  const where: Prisma.BlogPostWhereInput | undefined = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    : undefined;

  try {
    const blogPosts = await prisma.blogPost.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: orderBy || { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        published: true,
        imageUrl: true,
      },
    });

    const totalCount = await prisma.blogPost.count({
      where,
    });

    return { blogPosts, totalCount };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts.');
  }
}

export async function getBlogPostById(id: string) {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
    });
    return blogPost;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    throw new Error(`Failed to fetch blog post with ID ${id}.`);
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
        published: true,
        imageUrl: true, // <-- Add imageUrl to the select
        author: { select: { name: true } },
      },
    });
    return blogPost;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error(`Blog post with slug "${slug}" not found.`);
        return null; // Return null if the blog post is not found
      }
    }
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw new Error(`Failed to fetch blog post with slug ${slug}.`);
  }
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  content: string;
  published: boolean;
  authorId: string;
  imageUrl?: string;
}) {
  const { authorId, imageUrl, ...restOfData } = data;
  try {
    const newBlogPost = await prisma.blogPost.create({
      data: {
        ...restOfData,
        imageUrl: imageUrl || null,
        author: { connect: { id: authorId } },
      },
    });
    return newBlogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post.');
  }
}

export async function updateBlogPost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    published?: boolean;
  },
) {
  try {
    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data,
    });
    return updatedBlogPost;
  } catch (error) {
    console.error(`Error updating blog post with ID ${id}:`, error);
    throw new Error(`Failed to update blog post with ID ${id}.`);
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id}:`, error);
    throw new Error(`Failed to delete blog post with ID ${id}.`);
  }
}

export async function getBlogPostCount() {
  try {
    const count = await prisma.blogPost.count();
    return count;
  } catch (error) {
    console.error('Error getting blog post count:', error);
    throw error;
  }
}