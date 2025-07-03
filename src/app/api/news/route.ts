import { NextResponse } from "next/server";
import prisma from "src/lib/db/prisma";

export async function GET(request: Request) {
  try {
    // Get the URL to parse query parameters
    const { searchParams } = new URL(request.url);
    const excludeId = searchParams.get("exclude");

    // Build the where clause to only get published news articles
    const whereClause: any = {
      published: true,
    };

    // If exclude parameter is provided, add it to the where clause
    if (excludeId) {
      whereClause.id = {
        not: excludeId, // id is a string (uuid)
      };
    }

    // Fetch published news articles from the correct model, including imageUrl as coverImage
    const newsList = await prisma.newsArticle.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        published: true,
        createdAt: true,
        imageUrl: true,
        slug: true,
        // Add more fields if needed
      },
    });

    // Map imageUrl to coverImage for NewsList compatibility
    const newsWithCover = newsList.map((item) => ({
      ...item,
      coverImage: item.imageUrl
        ? { url: item.imageUrl, key: item.imageUrl }
        : null,
    }));

    return NextResponse.json(newsWithCover);
  } catch (error) {
    console.error("Failed to fetch news articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch news articles" },
      { status: 500 }
    );
  }
}