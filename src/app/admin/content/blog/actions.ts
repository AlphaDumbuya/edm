'use server';

import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/db/blog";
import { createAuditLogEntry } from '@/lib/db/auditLogs'; // Import the audit log function
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlogPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'on'; // Checkbox value

  if (!title || !slug || !content) {
    // Handle missing fields error
    console.error("Missing required fields");
    return; // Or throw an error
  }

  console.log("createBlogPostAction: Function started");
  console.log("createBlogPostAction: Extracted form data", { title, slug, published });

  // Receive authorId from client-side FormData
  const authorId = formData.get('authorId') as string;

  if (!authorId) {
    console.error("User not authenticated: authorId is missing");
    throw new Error("User not authenticated"); // Or handle appropriately
  }

  try {
    const newBlogPost = await createBlogPost({
      title, slug, content, published, authorId,
    });

    if (newBlogPost) { // Create audit log entry for creation
      await createAuditLogEntry({
        userId: authorId, // Use the received authorId
        action: 'Created Blog Post', // Ensure action is specific to blog posts// Use the received authorId
        entityType: 'BlogPost',
        entityId: newBlogPost.id,
        details: { title: newBlogPost.title },
      });
      console.log("Blog post created:", newBlogPost);
      revalidatePath('/admin/content/blog'); // Revalidate the blog list page
      redirect('/admin/content/blog'); // Redirect to the blog list page
    } else {
      // Handle creation failure
      console.error("Failed to create blog post");
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    // Handle error (e.g., show error message)
  }
}

export async function deleteBlogPostAction(blogPostId: string, userId: string) {
  try {
    if (!userId) {
      throw new Error("User not authenticated: userId is missing");
    }

    const deletedPost = await deleteBlogPost(blogPostId);

    if (deletedPost) { // Create audit log entry for deletion
 await createAuditLogEntry({
 userId: userId, // Use the received user ID
        action: 'Deleted Blog Post',
 entityType: 'BlogPost',
 entityId: deletedPost.id,
 });
 revalidatePath('/admin/content/blog');
 } else {
      console.error(`Failed to delete blog post with ID: ${blogPostId}`);
 }
  } catch (error: any) {
    console.error("Error deleting blog post:", error);
    // Handle error
  }
}

export async function updateBlogPostAction(blogPostId: string, formData: FormData, userId: string) {
  try {
    if (!userId) {
      throw new Error("User not authenticated"); // Or handle appropriately
    }

    const title = formData.get('title') as string | undefined; // Define variables and extract from formData
    const slug = formData.get('slug') as string | undefined;
    const content = formData.get('content') as string | undefined;
    const published = formData.get('published') === 'on'; // Checkbox value
 const updatedPost = await updateBlogPost(blogPostId, { title, slug, content, published }); // Now shorthand works

    if (updatedPost) {
      // Create audit log entry for update
      await createAuditLogEntry({
        userId: userId,
 action: 'Updated Blog Post', // Use the received user ID
        entityType: 'BlogPost',
 entityId: updatedPost.id,
        details: { title: updatedPost.title, published: updatedPost.published }, // Example details
      });
      revalidatePath('/admin/content/blog'); // Revalidate the blog list page
      redirect('/admin/content/blog'); // Redirect to the blog list page
    } else {
      console.error(`Failed to update blog post with ID: ${blogPostId}`);
    }
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    // Handle error (e.g., show error message)
  }
}