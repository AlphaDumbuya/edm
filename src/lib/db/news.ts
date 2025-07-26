import { NewsArticle as PrismaNewsArticle } from '@prisma/client';
import { prisma } from './prisma';

export type CreateNewsArticleData = {
  title: string;
  slug: string;
  content: string;
  authorId: string;
  imageUrl?: string | null;
  published?: boolean;
};

export type UpdateNewsArticleData = {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
};

export type NewsArticleWithAuthor = Omit<PrismaNewsArticle, 'authorId'> & {
  author: {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
  };
  imageUrl?: string | null; // Added imageUrl property
};

export async function getAllNewsArticles(publishedOnly: boolean = true): Promise<NewsArticleWithAuthor[]> {
  const { prisma } = await import('./prisma');
  
  async function fetchArticlesWithRetry(): Promise<NewsArticleWithAuthor[]> {
    const maxRetries = 3;
    let attempt = 0;
    let lastError: Error | null = null;
    
    while (attempt < maxRetries) {
      try {
        const articles = await prisma.$transaction(async (tx) => {
          const results = await tx.newsArticle.findMany({
            where: publishedOnly ? { published: true } : {},
            orderBy: { createdAt: 'desc' },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          });
          
          return results.map((article: any) => ({
            ...article,
            author: article.author || {
              id: 'unknown',
              name: 'Unknown Author',
              email: 'unknown@example.com',
              image: null,
            }
          }));
        }, {
          timeout: 15000, // 15 second timeout for the transaction
        });
        
        return articles;
      } catch (error) {
        lastError = error as Error;
        attempt++;
        
        if (attempt === maxRetries) {
          console.error('Failed to fetch news articles after', maxRetries, 'attempts:', error);
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    throw lastError || new Error('Failed to fetch news articles');
  }
  
  return fetchArticlesWithRetry().catch(err => {
    console.error('Error fetching all news articles:', err);
    return [];
  });
}

export async function getNewsArticleById(id: string): Promise<NewsArticleWithAuthor | null> {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    return article as NewsArticleWithAuthor | null;
  } catch (err) {
    console.error(`Error fetching news article with ID ${id}:`, err);
    return null;
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticleWithAuthor | null> {
  console.log('Fetching news article with slug:', slug);
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    console.log('Database query result:', article);
    return article as NewsArticleWithAuthor | null;
  } catch (err) {
    console.error(`Error fetching news article with slug ${slug}:`, err);
    return null;
  }
}

export async function createNewsArticle(data: CreateNewsArticleData): Promise<PrismaNewsArticle | null> {
  try {
    return await prisma.newsArticle.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        published: data.published ?? false,
        author: { connect: { id: data.authorId } },
      },
    });
  } catch (err) {
    console.error('Error creating news article:', err);
    return null;
  }
}

export async function updateNewsArticle(id: string, data: UpdateNewsArticleData): Promise<PrismaNewsArticle | null> {
  try {
    return await prisma.newsArticle.update({
      where: { id },
      data,
    });
  } catch (err) {
    console.error(`Error updating news article with ID ${id}:`, err);
    return null;
  }
}

export async function deleteNewsArticle(id: string): Promise<PrismaNewsArticle | null> {
  try {
    return await prisma.newsArticle.delete({
      where: { id },
    });
  } catch (err) {
    console.error(`Error deleting news article with ID ${id}:`, err);
    return null;
  }
}
