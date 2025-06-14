import { NextResponse, NextRequest } from "next/server";
import { isAdminServer } from "@/helpers/isAdminServer";
import prisma from "src/lib/db/prisma";
// import { utapi } from "@/utils/utapi"; // Commented out as per previous instruction

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await isAdminServer();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const newsItem = await prisma.news.findUnique({ where: { id: params.id } });
    if (!newsItem) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error("Failed to fetch news item:", error);
    return NextResponse.json({ error: "Failed to fetch news item" }, { status: 500 });
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

    const existingNews = await prisma.news.findUnique({ where: { id: params.id } });
    if (!existingNews) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }
    const existingImage = existingNews.coverImage;
    const newImage = body.coverImage;

    if (existingImage && !newImage && typeof existingImage === "object") {
      // Image removal logic handled externally
    }

    const updatedNews = await prisma.news.update({
      where: { id: params.id },
      data: {
        title: body.title ?? existingNews.title,
        content: body.content ?? existingNews.content,
        author: body.author ?? existingNews.author,
        published: body.published ?? existingNews.published,
        coverImage: body.coverImage ?? existingNews.coverImage,
      },
    });

    return NextResponse.json(updatedNews);
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

    const existingNews = await prisma.news.findUnique({ where: { id: params.id } });
    if (!existingNews) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    await prisma.news.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "News item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete news item:", error);
    return NextResponse.json({ error: "Failed to delete news item" }, { status: 500 });
  }
}