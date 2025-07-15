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

    // Create the blog post directly using the database function
    const newBlogPost = await createBlogPost({
      title,
      slug,
      content,
      published,
      authorId,
      imageUrl: imageUrl || undefined,
    });

    // Create audit log entry
    await createAuditLogEntry({
      userId: authorId,
      action: "Created Blog Post",
      entityType: "BlogPost",
      entityId: newBlogPost.id,
      details: { title, slug, published, imageUrl },
    });

    // Revalidate the blog pages
    revalidatePath("/blog");
    revalidatePath("/admin/content/blog");

    return newBlogPost;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error instanceof Error ? error : new Error("Failed to create blog post");
  }
}
