import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost, getAllBlogPosts } from '@/lib/db/blog';
import { createAuditLogEntry } from '@/lib/db/auditLogs';

export async function GET(req: NextRequest) {
  // List all blog posts
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ blogPosts: posts, totalCount: posts.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { title, slug, content, published, authorId, imageUrl } = data;
    if (!title || !slug || !content || !authorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newBlogPost = await createBlogPost({
      title,
      slug,
      content,
      published,
      authorId,
      imageUrl,
    });
    if (newBlogPost) {
      await createAuditLogEntry({
        userId: authorId,
        action: 'Created Blog Post',
        entityType: 'BlogPost',
        entityId: newBlogPost.id,
        details: { title: newBlogPost.title, slug: newBlogPost.slug, published: newBlogPost.published, imageUrl },
      });
      return NextResponse.json(newBlogPost, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error creating blog post' }, { status: 500 });
  }
}