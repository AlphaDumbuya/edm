import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/emailService';
import prisma from '@/lib/db/prisma'; // Correct import for prisma client
import type { Notification, Prisma } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email using the email service
    await emailService.sendMail({
      from: `${process.env.EMAIL_FROM_NAME || 'EDM Contact'} <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL || 'contact@edmmission.org',
      subject: `[EDM Contact] ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    // After sending contact email, create notification for admin
    // Fetch all admin and super admin users
    const admins = await prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'SUPER_ADMIN'] }
      }
    });
    // Create notification for each admin
    const notifications = await Promise.all(admins.map(admin => {
      const notificationData: Prisma.NotificationUncheckedCreateInput = {
        userId: admin.id,
        message: `Contact form submitted: ${name} (${email}) - ${subject}`,
      };
      
      return prisma.notification.create({
        data: notificationData,
      });
    }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
