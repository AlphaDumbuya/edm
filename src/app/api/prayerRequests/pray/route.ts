import { NextRequest, NextResponse } from 'next/server';
import { sendPrayerToRequester } from '@/lib/email/sendPrayerToRequester';
import { logPrayer } from '@/lib/db/prayerLog';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { recipientEmail, recipientName, prayerText, prayerFrom, prayerRequestId, prayedByUserId } = await req.json();
    if (!recipientEmail || !prayerText || !prayerRequestId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    // Get IP address from request
    const prayedByIp = req.headers.get('x-forwarded-for') || null;

    // Build OR array for Prisma filter, only including defined values
    const orArray = [];
    if (prayedByUserId) orArray.push({ prayedByUserId });
    if (prayedByIp) orArray.push({ prayedByIp });

    // Check if this user or IP has already prayed for this request
    const existing = await prisma.prayerLog.findFirst({
      where: {
        prayerRequestId,
        ...(orArray.length > 0 ? { OR: orArray } : {}),
      },
    });
    if (existing) {
      return NextResponse.json({ error: 'This request has already been prayed for.' }, { status: 409 });
    }

    // Log the prayer
    await logPrayer({
      prayerRequestId,
      prayedByUserId: prayedByUserId || null,
      prayedByIp,
      prayerText,
    });
    // Send the prayer email
    await sendPrayerToRequester({
      to: recipientEmail,
      toName: recipientName,
      prayerText,
      from: prayerFrom,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
