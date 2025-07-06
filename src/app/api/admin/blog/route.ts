import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost, getAllBlogPosts } from '@/lib/db/blogPosts';
import { createAuditLogEntry } from '@/lib/db/auditLogs';

export async function GET(req: NextRequest) {
  // List all blog posts for admin if ?admin=1, otherwise only published
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;
    const isAdmin = searchParams.get('admin') === '1';
    const { blogPosts, totalCount } = await getAllBlogPosts({ publishedOnly: !isAdmin, limit, offset, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ blogPosts, totalCount });
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