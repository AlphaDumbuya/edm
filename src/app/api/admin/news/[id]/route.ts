import { NextResponse, NextRequest } from "next/server";
import { isAdminServer } from "@/helpers/isAdminServer";
import { prisma } from "@/lib/db/prisma";
// import { utapi } from "@/utils/utapi"; // Commented out as per previous instruction

// Fix dynamic API route signature for Next.js app directory
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const isAdmin = await isAdminServer();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }
    const id = context.params.id;
    console.log('Fetching news article with id:', id);
    const newsItem = await prisma.newsArticle.findUnique({ where: { id } });
    if (!newsItem) {
      console.error('News article not found for id:', id);
      return NextResponse.json({ error: "News article not found", id }, { status: 404 });
    }
    // Always return imageUrl for frontend compatibility
    return NextResponse.json({ ...newsItem, imageUrl: newsItem.imageUrl || null });
  } catch (error) {
    console.error("Failed to fetch news item:", error, context?.params?.id);
    return NextResponse.json({ error: "Failed to fetch news item", details: String(error), id: context?.params?.id }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await isAdminServer();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await request.json();

    const existingNews = await prisma.newsArticle.findUnique({ where: { id: params.id } });
    if (!existingNews) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }
    const updatedNews = await prisma.newsArticle.update({
      where: { id: params.id },
      data: {
        title: body.title ?? existingNews.title,
        content: body.content ?? existingNews.content,
        slug: body.slug ?? existingNews.slug,
        published: body.published ?? existingNews.published,
        imageUrl: body.imageUrl ?? existingNews.imageUrl,
        authorId: body.authorId ?? existingNews.authorId,
      },
    });
    return NextResponse.json({ ...updatedNews, imageUrl: updatedNews.imageUrl || null });
  } catch (error) {
    console.error("Failed to update news item:", error);
    return NextResponse.json({ error: "Failed to update news item" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await isAdminServer();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const existingNews = await prisma.newsArticle.findUnique({ where: { id: params.id } });
    if (!existingNews) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    await prisma.newsArticle.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "News item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete news item:", error);
    return NextResponse.json({ error: "Failed to delete news item" }, { status: 500 });
  }
}