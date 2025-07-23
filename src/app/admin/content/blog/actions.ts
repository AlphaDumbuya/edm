"use server";

import { createBlogPost } from "@/lib/db/blogPosts";
import { createAuditLogEntry } from "@/lib/db/auditLogs";
import { revalidatePath } from "next/cache";

export async function createBlogPostAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "true";
    const imageUrl = formData.get("imageUrl") as string | null;
    const authorId = formData.get("authorId") as string | null;

    if (!title || !slug || !content || !authorId) {
      throw new Error("Missing required fields");
    }

    const blogPost = await createBlogPost({
      title,
      slug,
      content,
      published,
      authorId,
      imageUrl: imageUrl || undefined
    });

    if (!blogPost) {
      throw new Error("Failed to create blog post");
    }

    // Create audit log entry
    await createAuditLogEntry({
      userId: authorId,
      action: 'Created Blog Post',
      entityType: 'BlogPost',
      entityId: blogPost.id,
      details: { title, slug, published }
    });

    // Revalidate the blog list page
    revalidatePath('/admin/content/blog');
    revalidatePath('/blog');

    return { success: true, blogPost };
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error instanceof Error ? error : new Error('Failed to create blog post');
  }
}
