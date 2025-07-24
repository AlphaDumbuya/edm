import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { volunteerConfirmationEmail } from '@/emails/volunteer-confirmation';
import { sendMail } from '@/lib/email/sendMail';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, areasOfInterest, availability, message } = data;
    if (!name || !email || !areasOfInterest || !availability) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Ensure areasOfInterest is an array
    const areas = Array.isArray(areasOfInterest) ? areasOfInterest : [areasOfInterest];
    
    // Store volunteer signup
    const volunteer = await prisma.volunteer.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        phone: phone || null,
        areasOfInterest: areas,
        availability,
        message: message || null,
      },
    });
    // Log to audit log for admin notification
    const auditLog = await prisma.auditLog.create({
      data: {
        userId: null,
        action: 'New Volunteer Signup',
        entityType: 'Volunteer',
        entityId: volunteer.id,
        details: { name, email, phone, areasOfInterest, availability, message },
      },
    });
    // Send professional confirmation email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.error('Invalid email for volunteer confirmation:', email);
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    const { subject, html, text } = volunteerConfirmationEmail({ name, email, phone, areasOfInterest, availability, message });
    console.log('Sending volunteer confirmation email to:', email, 'subject:', subject);
    await sendMail({ to: email, subject, html, text });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Volunteer signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ volunteers });
  } catch (error) {
    console.error('Failed to fetch volunteers:', error);
    return NextResponse.json({ volunteers: [], error: 'Failed to fetch volunteers' }, { status: 500 });
  }
}
