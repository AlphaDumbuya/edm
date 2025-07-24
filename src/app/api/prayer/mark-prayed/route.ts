import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const { prayerId } = await req.json();

    if (!prayerId) {
      return NextResponse.json({ error: "Prayer ID is required" }, { status: 400 });
    }

    // Create a prayer log entry to track that someone prayed for this request
    await prisma.prayerLog.create({
      data: {
        prayerRequestId: prayerId,
        createdAt: new Date()
      }
    });

    // Clean up old prayed requests (older than 5 days and have been prayed for)
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    await prisma.prayerRequest.deleteMany({
      where: {
        createdAt: {
          lt: fiveDaysAgo
        },
        // Only delete prayer requests that have prayer logs
        prayerLogs: {
          some: {}
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling prayer request:", error);
    return NextResponse.json(
      { error: "Failed to process prayer request" },
      { status: 500 }
    );
  }
}
