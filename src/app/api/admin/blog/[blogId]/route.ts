import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/db/blog';
import { createAuditLogEntry } from '@/lib/db/auditLogs';

export async function GET(req: NextRequest, { params }: { params: { blogId: string } }) {
  try {
    const post = await getBlogPostById(params.blogId);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { blogId: string } }) {
  try {
    const data = await req.json();
    const { title, slug, content, published, userId, imageUrl } = data;
    if (!userId) return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    const updatedPost = await updateBlogPost(params.blogId, { title, slug, content, published, imageUrl });
    if (updatedPost) {
      await createAuditLogEntry({
        userId,
        action: 'Updated Blog Post',
        entityType: 'BlogPost',
        entityId: updatedPost.id,
        details: { title: updatedPost.title, published: updatedPost.published, imageUrl },
      });
      return NextResponse.json(updatedPost);
    } else {
      return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error updating blog post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { blogId: string } }) {
  try {
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    const deletedPost = await deleteBlogPost(params.blogId);
    if (deletedPost) {
      await createAuditLogEntry({
        userId,
        action: 'Deleted Blog Post',
        entityType: 'BlogPost',
        entityId: deletedPost.id,
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting blog post' }, { status: 500 });
  }
}