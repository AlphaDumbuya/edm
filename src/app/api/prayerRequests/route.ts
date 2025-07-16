// src/app/api/prayerRequests/route.ts
import { getAllPrayerRequests } from '@/lib/db/prayerRequests';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { prayerRequests } = await getAllPrayerRequests();
    return NextResponse.json(prayerRequests);
  } catch (error) {
    console.error('Error in API route fetching prayer requests:', error);
    return NextResponse.json({ message: 'Failed to fetch prayer requests' }, { status: 500 });
  }
}

// Assuming POST logic is in place for storing prayer requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Store prayer request
    // (Assuming POST logic, add notification after creation)
    // await prisma.prayerRequest.create({ ... })
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
          message: `New prayer request submitted`,
        },
      })
    ));
    return NextResponse.json({ message: 'Prayer request submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error in API route submitting prayer request:', error);
    return NextResponse.json({ message: 'Failed to submit prayer request' }, { status: 500 });
  }
}