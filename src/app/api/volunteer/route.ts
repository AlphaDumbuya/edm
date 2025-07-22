import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma-vercel';
import { volunteerConfirmationEmail } from '@/emails/volunteer-confirmation';
import { sendMail } from '@/lib/email/sendMail';

export async function POST(req: NextRequest) {
  try {
    console.log('Starting volunteer signup process...');
    const data = await req.json();
    console.log('Received volunteer data:', { 
      ...data, 
      // Only show first character of phone number for privacy
      phone: data.phone ? `${data.phone.charAt(0)}...` : undefined 
    });
    const { name, email, phone, areasOfInterest, availability, message } = data;
    if (!name || !email || !areasOfInterest || !availability) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    console.log('Validating database connection...');
    try {
      // Test connection by attempting to connect
      await prisma.$connect();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      throw new Error('Database connection failed');
    }

    console.log('Creating volunteer record...');
    // Store volunteer signup
    const volunteer = await prisma.volunteer.create({
      data: {
        name,
        email,
        phone,
        areasOfInterest,
        availability,
        message,
      },
    });
    console.log('Volunteer record created successfully:', { id: volunteer.id });
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
  } catch (error: any) {
    console.error('Volunteer signup error:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      name: error.name,
      stack: error.stack
    });

    // Return more specific error messages
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'You have already signed up as a volunteer with this email address' 
      }, { status: 409 });
    }

    if (error.message === 'Database connection failed') {
      return NextResponse.json({ 
        error: 'Unable to connect to the database. Please try again later.' 
      }, { status: 503 });
    }

    return NextResponse.json({ 
      error: 'Internal server error. Please try again later.',
      code: error.code || 'UNKNOWN'
    }, { status: 500 });
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
