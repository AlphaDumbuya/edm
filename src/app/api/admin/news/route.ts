import { NextResponse } from "next/server";
import { isAdminServer } from "@/helpers/isAdminServer";
import prisma from "@/lib/db/prisma";
import slugify from "slugify";
 
export async function GET() {
  try {
    // Check if user is admin
    const isAdmin = await isAdminServer();
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Fetch all news
    const newsList = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(newsList);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check if user is admin
    const isAdmin = await isAdminServer();
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!body.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (!body.author) {
      return NextResponse.json(
        { error: "Author is required" },
        { status: 400 }
      );
    }

    // Generate slug from the title
    const slug = slugify(body.title, { lower: true, strict: true });

    // Create new news item with coverImage if provided
    const newsItem = await prisma.news.create({
      data: {
        title: body.title,
        slug: slug, // Include the generated slug
        content: body.content,
        author: body.author,
        published: body.published ?? false,
        coverImage: body.coverImage || null, // Store the UploadThing file metadata
      },
    });

    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    console.error("Failed to create news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}