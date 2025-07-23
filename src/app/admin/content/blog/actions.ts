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

  // Try to use the current server's origin for fetch
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (typeof window === 'undefined') {
      // On the server, try to infer from headers (Node.js only)
      const { headers } = require('next/headers');
      const host = headers().get('host');
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      baseUrl = `${protocol}://${host}`;
    } else {
      baseUrl = window.location.origin;
    }
  }

  const res = await fetch(`${baseUrl}/api/admin/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, slug, content, published, imageUrl, authorId }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create blog post");
  }
}
