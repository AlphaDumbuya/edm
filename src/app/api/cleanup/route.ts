import { NextRequest, NextResponse } from "next/server";
import { cleanupOldContent } from "@/lib/cleanup/auto-cleanup";

export async function POST(req: NextRequest) {
  try {
    const result = await cleanupOldContent();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Error running cleanup:", error);
    return NextResponse.json(
      { error: "Failed to run cleanup" },
      { status: 500 }
    );
  }
}
