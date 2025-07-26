import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(media);
  } catch (error) {
    console.error('Error fetching gallery media:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery media' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type, title, imageUrl, videoUrl, date,
      description, category, altText, location, photographer, eventName
    } = body;
    // Always set published true for new uploads
    const published = true;
    if (!type || !title || (type === 'photo' && !imageUrl) || (type === 'video' && !videoUrl)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Store extra fields in meta JSON
    const meta = { description, category, altText, location, photographer, eventName };
    const media = await prisma.media.create({
      data: {
        type,
        title,
        imageUrl: type === 'photo' ? imageUrl : null,
        videoUrl: type === 'video' ? videoUrl : null,
        date: date ? new Date(date) : new Date(),
        published,
        meta,
      },
    });
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}

// PATCH: Update visibility
export async function PATCH(req: NextRequest) {
  try {
    const { id, published } = await req.json();
    if (!id || typeof published !== 'boolean') {
      return NextResponse.json({ error: 'Missing id or published' }, { status: 400 });
    }
    const updated = await prisma.media.update({
      where: { id },
      data: { published },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating visibility:', error);
    return NextResponse.json({ error: 'Failed to update visibility' }, { status: 500 });
  }
}

// DELETE: Delete media
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
