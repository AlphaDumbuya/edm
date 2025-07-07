import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/prayerRequests/hasPrayed?requestId=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prayerRequestId = searchParams.get('requestId');
  if (!prayerRequestId) {
    return NextResponse.json({ error: 'Missing requestId' }, { status: 400 });
  }
  // Check if any prayer log exists for this request
  const existing = await prisma.prayerLog.findFirst({
    where: { prayerRequestId },
  });
  return NextResponse.json({ prayed: !!existing });
}
