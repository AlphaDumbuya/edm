'use server';

import { createNewsArticle, deleteNewsArticle, updateNewsArticle } from "@/lib/db/news";
import { getAllNewsArticles } from "@/lib/db/newsArticles";
import { createAuditLogEntry } from '@/lib/db/auditLogs';
import { redirect } from 'next/navigation';

export async function createNewsArticleAction(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'on'; // Checkbox value

  if (!title || !slug || !content) {
    // Basic validation
    console.error('Missing required fields');
    // In a real application, you'd handle this with user feedback
    return { error: 'Missing required fields' };
  }
  try {
    // You'll need the authorId. In a real app, you'd get this from the authenticated user session.
    // For now, using a placeholder. Replace 'YOUR_AUTHOR_ID' with actual logic.
    const authorId = 'YOUR_AUTHOR_ID'; // Replace with actual author ID logic

    if (authorId === 'YOUR_AUTHOR_ID') {
        console.error('Author ID not set');
        return { error: 'Author ID not set' };
    }


    const newNewsArticle = await createNewsArticle({
      title,
      slug,
      content,
      published,
      authorId, // Pass the authorId
    });

    if (!newNewsArticle) {
      console.error('Failed to create news article: createNewsArticle returned null');
      // In a real application, you'd handle this with user feedback
      return { error: 'Failed to create news article' };
    }

    console.log('News Article created:', newNewsArticle);

    // Create audit log entry
    await createAuditLogEntry({
      userId: authorId, // Use the actual author ID
      action: 'Created News Article',
      entityType: 'NewsArticle',
      entityId: newNewsArticle.id,
      details: { title: newNewsArticle.title },
    });
    // Redirect on success
    redirect('/admin/content/news'); // Moved inside the try block


  } catch (error) {
    console.error('Error creating news article:', error);
    // In a real application, you'd handle this with user feedback
    return { error: 'Failed to create news article' };
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