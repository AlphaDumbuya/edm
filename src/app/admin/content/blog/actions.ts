'use server';

import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/db/blog";
import { createAuditLogEntry } from '@/lib/db/auditLogs'; // Import the audit log function
import { getCurrentUserId } from '@/lib/auth/session'; // Assuming you have a function to get the current user ID
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

  try {
    const userId = await getCurrentUserId(); // Get the current user's ID
    if (!userId) {
      throw new Error("User not authenticated"); // Or handle appropriately
    }

    const newBlogPost = await createBlogPost({
      title,
      slug,
      content,
      published,
      authorId: userId, // Add authorId
    });

    if (newBlogPost) {
      // Create audit log entry for creation
      await createAuditLogEntry({
        userId: userId,
        action: 'Created Blog Post',
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

export async function deleteBlogPostAction(blogPostId: string) {
  try {
    const userId = await getCurrentUserId(); // Get the current user's ID
     if (!userId) {
      throw new Error("User not authenticated"); // Or handle appropriately
    }
    
 const deletedPost = await deleteBlogPost(blogPostId);

 if (deletedPost) {
      // Create audit log entry for deletion
 await createAuditLogEntry({
 userId: userId,
 action: 'Deleted Blog Post',
 entityType: 'BlogPost',
 entityId: deletedPost.id,
 });
 revalidatePath('/admin/content/blog'); // Revalidate the blog list page
 } else {
      console.error(`Failed to delete blog post with ID: ${blogPostId}`);
 }
  } catch (error) {
    console.error("Error deleting blog post:", error);
    // Handle error
  }
}

export async function updateBlogPostAction(blogPostId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'on'; // Checkbox value

  if (!title || !slug || !content) {
    // Handle missing fields error
    console.error("Missing required fields for update");
    return; // Or throw an error
  }

  try {
     const userId = await getCurrentUserId(); // Get the current user's ID
      if (!userId) {
      throw new Error("User not authenticated"); // Or handle appropriately
    }
    
    const updatedPost = await updateBlogPost(blogPostId, { title, slug, content, published });

    if (updatedPost) {
      // Create audit log entry for update
      await createAuditLogEntry({
        userId: userId,
        action: 'Updated Blog Post',
        entityType: 'BlogPost',
        entityId: updatedPost.id,
        details: { title: updatedPost.title, published: updatedPost.published }, // Example details
      });
      revalidatePath('/admin/content/blog'); // Revalidate the blog list page
      redirect('/admin/content/blog'); // Redirect to the blog list page
    } else {
      console.error(`Failed to update blog post with ID: ${blogPostId}`);
    }
  } catch (error) {
    console.error("Error updating blog post:", error);
    // Handle error (e.g., show error message)
  }
}