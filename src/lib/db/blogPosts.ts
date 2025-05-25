import { prisma } from '../db/prisma';

export async function getAllBlogPosts(options?: {
  search?: string;
  offset?: number;
  limit?: number;
  orderBy?: { [key: string]: 'asc' | 'desc' };
}) {
  const { search, offset, limit, orderBy } = options || {};

  const where = search
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
    : {};

  try {
    const blogPosts = await prisma.blogPost.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: orderBy || { createdAt: 'desc' },
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

export async function createBlogPost(data: {
  title: string;
  slug: string;
  content: string;
  published: boolean;
}) {
  try {
    const newBlogPost = await prisma.blogPost.create({
      data,
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