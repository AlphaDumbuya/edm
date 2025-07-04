// @ts-ignore
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getVerificationEmailHtml } from '@/emails/verification-template';

export async function POST(request: Request) {
  try {
    const { user, url, token } = await request.json();

    // Setup SMTP transporter using Brevo/Sendinblue credentials from env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const html = getVerificationEmailHtml({ name: user.name || user.email, verificationUrl: url });

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Verify your EDM account',
      html,
    });

    return NextResponse.json({ message: 'Email verification email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error in email verification API route:', error);
    return NextResponse.json({ error: 'Failed to send email verification email' }, { status: 500 });
  }
}