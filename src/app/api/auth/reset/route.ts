import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import nodemailer from 'nodemailer';
import { resetPasswordEmail } from '@/emails/reset-password-template';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'No user found with that email.' }, { status: 404 });
  }

  // Generate reset token
  const token = require('crypto').randomBytes(32).toString('hex');
  const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiry

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordResetToken: token, passwordResetTokenExpiry: tokenExpiry },
  });

  // Build reset URL
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

  // Send email
  const { subject, html, text } = resetPasswordEmail({ resetUrl });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
  });

  try {
    await transporter.sendMail({
      from: {
        name: process.env.EMAIL_FROM_NAME || 'EDM',
        address: process.env.EMAIL_FROM || 'noreply@edm.org'
      },
      to: user.email,
      subject,
      html,
      text,
    });

    return NextResponse.json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json({ error: 'Failed to send password reset email.' }, { status: 500 });
  }
}
