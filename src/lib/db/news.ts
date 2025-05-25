// src/lib/db/news.ts
import prisma from './prisma';
import { NewsArticle as PrismaNewsArticle } from '@prisma/client';

export type CreateNewsArticleData = {
  title: string;
  slug: string;
  content: string;
  authorId: string; // Assuming authorId is required on creation
  published?: boolean;
};

export type UpdateNewsArticleData = {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
};

export async function getAllNewsArticles(): Promise<PrismaNewsArticle[]> {
  try {
    const newsArticles = await prisma.newsArticle.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: { // Include author data if needed
        author: {
          select: {
            id: true,
            name: true,
            email: true, // Be cautious about exposing email
          },
        },
      },
    });
    return newsArticles;
  } catch (error) {
    console.error('Error fetching all news articles:', error);
    return [];
  }
}

export async function getNewsArticleById(id: string): Promise<PrismaNewsArticle | null> {
  try {
    const newsArticle = await prisma.newsArticle.findUnique({
      where: { id },
      include: { // Include author data if needed
        author: {
          select: {
            id: true,
            name: true,
            email: true, // Be cautious about exposing email
          },
        },
      },
    });
    return newsArticle;
  } catch (error) {
    console.error(`Error fetching news article with ID ${id}:`, error);
    return null;
  }
}

export async function createNewsArticle(data: CreateNewsArticleData): Promise<PrismaNewsArticle | null> {
  try {
    const newsArticle = await prisma.newsArticle.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        author: {
          connect: { id: data.authorId }, // Connect to an existing author
        },
        published: data.published ?? false,
      },
    });
    return newsArticle;
  } catch (error) {
    console.error('Error creating news article:', error);
    return null;
  }
}

export async function updateNewsArticle(id: string, data: UpdateNewsArticleData): Promise<PrismaNewsArticle | null> {
  try {
    const newsArticle = await prisma.newsArticle.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        published: data.published,
      },
    });
    return newsArticle;
  } catch (error) {
    console.error(`Error updating news article with ID ${id}:`, error);
    return null;
  }
}

export async function deleteNewsArticle(id: string): Promise<PrismaNewsArticle | null> {
  try {
    const newsArticle = await prisma.newsArticle.delete({
      where: { id },
    });
    return newsArticle;
  } catch (error) {
    console.error(`Error deleting news article with ID ${id}:`, error);
    return null;
  }
}