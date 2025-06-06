'use server';

// Assuming your audit log function is correctly typed elsewhere
import { createAuditLogEntry, CreateAuditLogEntryParams } from "@/lib/db/auditLogs"; // Import CreateAuditLogEntryParams if you have it
import { redirect } from "next/navigation";

import { decrypt } from '@/lib/auth/session';
import { getNewsArticleById, createNewsArticle, getAllNewsArticles, deleteNewsArticle, updateNewsArticle } from "@/lib/db/newsArticles";

import { cookies } from 'next/headers'; // Import cookies

export async function fetchNewsArticleAction(id: string) {
  try {
    const newsArticle = await getNewsArticleById(id);
    return newsArticle; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching news article with ID ${id} in server action:`, error);
    // Handle or re-throw the error as needed
    throw error;
  }
}

export async function createNewsArticleAction(formData: FormData) {
 console.log('createNewsArticleAction started');
  console.log(formData);

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string; // Extract slug
  const published = formData.get('published') === 'on'; // Extract published status (boolean)
  const contentFromEditor = formData.get('content') as string; // Content is from the rich text editor
  const imageUrl = formData.get('imageUrl') as string | null; // Get the image URL from the form data

 // 2. TODO: Validate the extracted data (highly recommended)

  if (!title || !slug) {
    // Basic validation
    console.error('Missing required fields');
    // In a real application, you'd handle this with user feedback
    return { error: 'Missing required fields' };
  }
  try {
    // Get the authorId from the authenticated user session
    const sessionCookie = (await cookies()).get('session');
    if (!sessionCookie) {
      console.error('Session cookie not found');
      return { error: 'Authentication failed' };
    }
    const session = await decrypt(sessionCookie.value);
    if (!session || !session.userId) {
      console.error('Invalid session or user ID not found');
      return { error: 'Authentication failed' };
    }
    const authorId = session.userId;


    // Content transformation now happens on the client side in create/page.tsx
    // The contentFromEditor is already the transformed HTML string
    const transformedContent = contentFromEditor;
    console.log('Data being sent to createNewsArticle:', { title, slug, content: transformedContent, published });
    // Call your database function to create the news article
 console.log('Attempting to create news article in DB');
    const newNewsArticle = await createNewsArticle({
      title,
      slug,
      content: transformedContent,
      published,
      authorId, // Pass authorId here
    });


    if (!newNewsArticle) {
      console.error('Failed to create news article: createNewsArticle returned null');
      // In a real application, you'd handle this with user feedback
      return { error: 'Failed to create news article' };
    }
    // Check for any errors returned by the database function itself

    console.log('News Article created:', newNewsArticle);

    // Create audit log entry
 console.log('Creating audit log entry');

    await createAuditLogEntry({
      userId: authorId, // Use the actual author ID
      action: 'Created News Article',
      // Consider adding entity type and ID if you have a structured audit log
      entityType: 'NewsArticle',
      entityId: newNewsArticle.id,
      // You might want to include a snapshot of the created data
      // but be mindful of storing potentially large content in audit logs
      // snapshot: newNewsArticle,
    });
 console.log('createNewsArticleAction finished successfully');
 return { success: true }; // Return success indicator
  } catch (error) {
    console.error('Error creating news article:', error);
    // Provide more specific error handling or feedback here if needed
 throw new Error('Failed to create news article');
  }
}

export async function getNewsArticlesAction({ search, limit, offset, orderBy }: { search?: string; limit?: number; offset?: number; orderBy?: { createdAt: string } }) {
  try {
    const result = await getAllNewsArticles({ search, limit, offset });
    return result;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    // In a real application, you'd handle this with user feedback
    throw new Error('Failed to fetch news articles.');
  }
}

export async function deleteNewsArticleAction(id: string) {
  try {
    await deleteNewsArticle(id);

    // Create audit log entry
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID', // Replace with actual user ID logic
      action: 'Deleted News Article',
      entityType: 'NewsArticle',
      entityId: id,
    });
    console.log(`News Article with ID ${id} deleted`);
  } catch (error) {
    console.error(`Error deleting news article with ID ${id}:`, error);
    return { error: 'Failed to delete news article' };
  }
}

export async function updateNewsArticleAction(id: string, formData: FormData): Promise<void> {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'on'; // Checkbox value

  try {
    const updatedNewsArticle = await updateNewsArticle(id, {
      title,
      slug,
      content,
      published,
    });

    if (!updatedNewsArticle) {
      console.error(`Failed to update news article with ID ${id}: updateNewsArticle returned null`);
      // In a real application, you'd handle this with user feedback
      return;
    }

    // Create audit log entry
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID', // Replace with actual user ID logic
      action: 'Updated News Article',
      entityType: 'NewsArticle',

      entityId: updatedNewsArticle.id,
      details: { updates: { title, slug, content, published } }, // Include updated fields
    });
  } catch (error) {
    console.error(`Error updating news article with ID ${id}:`, error);    // In a real application, you'd handle this with user feedback
 // In a real application, you'd handle this with user feedback
    // In a real application, you'd handle this with user feedback
  }
}