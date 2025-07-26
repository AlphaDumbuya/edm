import { prisma } from '@/lib/db/prisma';

export async function getAllNewsArticles(options?: {
  search?: string;
  offset?: number;
  limit?: number;
  orderBy?: { [key: string]: 'asc' | 'desc' };
}) {
  const { search, offset, limit, orderBy } = options || {};

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { content: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};

  try {
    const [newsArticles, totalCount] = await prisma.$transaction([
      prisma.newsArticle.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      prisma.newsArticle.count({ where }),
    ]);

    return { newsArticles, totalCount };
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw new Error('Failed to fetch news articles.');
  }
}

export async function getNewsArticleById(id: string) {
  try {
    const newsArticle = await prisma.newsArticle.findUnique({
      where: { id },
    });
    return newsArticle;
  } catch (error) {
    console.error(`Error fetching news article with ID ${id}:`, error);
    throw new Error(`Failed to fetch news article with ID ${id}.`);
  }
}

export async function createNewsArticle(data: {
  title: string;
  slug: string;
  content: string;
  published?: boolean;
  authorId: string; // Add authorId here
}) {
  try {
    const newNewsArticle = await prisma.newsArticle.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        published: data.published,
        authorId: data.authorId, // Pass authorId here
      },
    });
    return newNewsArticle;
  } catch (error) {
    console.error('Error creating news article:', error);
    throw new Error('Failed to create news article.');
  }
}

export async function updateNewsArticle(
  id: string,
  data: { title?: string; slug?: string; content?: string; published?: boolean },
) {
  try {
    const updatedNewsArticle = await prisma.newsArticle.update({
      where: { id },
      data,
    });
    return updatedNewsArticle;
  } catch (error) {
    console.error(`Error updating news article with ID ${id}:`, error);
    throw new Error(`Failed to update news article with ID ${id}.`);
  }
}

export async function deleteNewsArticle(id: string) {
  try {
    await prisma.newsArticle.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting news article with ID ${id}:`, error);
    throw new Error(`Failed to delete news article with ID ${id}.`);
  }
}

export async function getNewsArticleCount() {
  try {
    const count = await prisma.newsArticle.count();
    return count;
  } catch (error) {
    console.error("Error getting news article count:", error);
    throw error;
  }
}