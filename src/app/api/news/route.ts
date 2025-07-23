import { NextResponse } from "next/server";
import prisma from "src/lib/db/prisma";
import { validate as validateUUID, v4 as uuidv4 } from "uuid";

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

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: any = {};
    if (contentType.includes("application/json")) {
      data = await request.json();
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const { title, content, imageUrl, published, authorId, slug } = data;
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }
    if (!authorId || !validateUUID(authorId)) {
      return NextResponse.json(
        { error: "A valid authorId (UUID) is required." },
        { status: 400 }
      );
    }

    const created = await prisma.newsArticle.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        published: published === "on" || published === true || published === "true",
        authorId,
        slug: slug || null,
      },
    });

    // After creating news article, add notification
    if (created.published) {
      try {
        // Fetch all admin and super admin users
        const admins = await prisma.user.findMany({
          where: {
            role: { in: ['ADMIN', 'SUPER_ADMIN'] }
          },
          select: {
            id: true
          }
        });
        
        if (admins.length > 0) {
          // Create notifications for all admins at once

          await prisma.notification.createMany({
            data: admins.map(admin => ({
              id: uuidv4(),
              userId: admin.id,
              message: `New news article published: ${title}`,
              read: false
            }))
          });
        }
      } catch (notificationError) {
        // Log the error but don't fail the request
        console.error("Failed to create notifications:", notificationError);
      }
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Failed to create news article:", error);
    return NextResponse.json(
      { error: "Failed to create news article" },
      { status: 500 }
    );
  }
}