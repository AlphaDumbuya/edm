import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

// GET: Fetch all approved testimonials
export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(testimonials);
}

// POST: Create a new testimonial (auto-approved for now)
export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json();
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
    }
    const testimonial = await prisma.testimonial.create({
      data: { name, message, approved: true }, // auto-approve for now
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
          message: `New testimonial submitted by ${name}`,
        },
      })
    ));
    return NextResponse.json({ success: true, testimonial });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
