import { NextResponse } from "next/server";
import prisma from "src/lib/db/prisma";

export async function GET(request: Request) {
  try {
    // Get the URL to parse query parameters
    const { searchParams } = new URL(request.url);
    const excludeId = searchParams.get("exclude");

    // Build the where clause to only get published news
    const whereClause: any = {
      published: true,
    };

    // If exclude parameter is provided, add it to the where clause
    if (excludeId) {
      whereClause.id = {
        not: parseInt(excludeId),
      };
    }

    // Fetch published news
    const newsList = await prisma.news.findMany({
      where: whereClause,
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