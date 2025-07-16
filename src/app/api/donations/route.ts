import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { amount, donorName, donorEmail, paymentMethod, campaign } = data;
    if (!amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        donorName,
        donorEmail,
        paymentMethod,
        campaign,
      },
    });
    // Fetch all admin and super admin users
    const admins = await prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'SUPER_ADMIN'] }
      }
    });
    // Create notification for each admin
    await Promise.all(admins.map(admin =>
      prisma.notification.create({
        data: {
          userId: admin.id,
          message: `New donation: ${donorName || 'Anonymous'} donated $${amount} via ${paymentMethod}${campaign ? ' to ' + campaign : ''}`,
        },
      })
    ));
    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Error saving donation:', error);
    return NextResponse.json({ error: 'Failed to save donation.' }, { status: 500 });
  }
}
