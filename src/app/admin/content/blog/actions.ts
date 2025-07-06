"use server";

// This is a basic server action for creating a blog post. Adjust as needed for your backend.
import { redirect } from "next/navigation";
// import your db logic here, e.g. import { createBlogPost } from "../../../lib/db/blogPosts";

export async function createBlogPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "true";
  const imageUrl = formData.get("imageUrl") as string | null;
  const authorId = formData.get("authorId") as string | null;

  if (!title || !slug || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  // Use absolute URL for server-side fetch
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, slug, content, published, imageUrl, authorId }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create blog post");
  }
  return await res.json();
}
