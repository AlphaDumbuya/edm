import { NextRequest, NextResponse } from 'next/server';
import { sendEventRegistrationEmail } from '../../../../lib/email/sendEventRegistrationEmail';
import { createEventRegistration } from '../../../../lib/db/eventRegistrations';
import { prisma } from '@/lib/db/prisma'; // Import prisma client

export async function POST(req: NextRequest) {
  let input = null;
  try {
    input = await req.json();
    const { name, email, event } = input;
    if (!name || !email || !event) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Save registration to DB
    await createEventRegistration({ name, email, eventId: event.id });
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
          message: `Event signup: ${name} (${email}) for event ${event.title}`,
        },
      })
    ));
    // Send confirmation email
    await sendEventRegistrationEmail({ name, email, event });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Event registration email error:', error);
    if (input) {
      console.error('Event registration input:', JSON.stringify(input));
    }
    if (error instanceof Error && error.stack) {
      console.error('Error stack:', error.stack);
    }
    let errorMessage = typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error);
    return NextResponse.json({ error: 'Failed to send email', details: errorMessage }, { status: 500 });
  }
}
