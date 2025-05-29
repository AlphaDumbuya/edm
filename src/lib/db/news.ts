import { NewsArticle as PrismaNewsArticle } from '@prisma/client';

export type CreateNewsArticleData = {
  title: string;
  slug: string;
  content: string;
  authorId: string;
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

export async function getAllNewsArticles(): Promise<NewsArticleWithAuthor[]> {
  const { default: prisma } = await import('./prisma');
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const enriched = await Promise.all(
      articles.map(async (article) => {
        const author = await prisma.user.findUnique({
          where: { id: article.authorId },
          select: { id: true, name: true, email: true, image: true },
        });

        return {
          ...article,
          author: author || {
            id: 'unknown',
            name: 'Unknown Author',
            email: 'unknown@example.com',
            image: null,
          },
        };
      })
    );

    return enriched;
  } catch (err) {
    console.error('Error fetching all news articles:', err);
    return [];
  }
}

export async function getNewsArticleById(id: string): Promise<NewsArticleWithAuthor | null> {
  const { default: prisma } = await import('./prisma');
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
  const { default: prisma } = await import('./prisma');
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    return article as NewsArticleWithAuthor | null;
  } catch (err) {
    console.error(`Error fetching news article with slug ${slug}:`, err);
    return null;
  }
}

export async function createNewsArticle(data: CreateNewsArticleData): Promise<PrismaNewsArticle | null> {
  const { default: prisma } = await import('./prisma');
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
  const { default: prisma } = await import('./prisma');
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
  const { default: prisma } = await import('./prisma');
  try {
    return await prisma.newsArticle.delete({
      where: { id },
    });
  } catch (err) {
    console.error(`Error deleting news article with ID ${id}:`, err);
    return null;
  }
}
