// src/app/api/auth/resend-verification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
// @ts-ignore
import nodemailer from 'nodemailer';
import { getVerificationEmailHtml } from '@/emails/verification-template';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'No user found with that email.' }, { status: 404 });
  }
  if (user.emailVerified) {
    return NextResponse.json({ error: 'Email is already verified.' }, { status: 400 });
  }
  // Generate a new token if missing
  let token = user.emailVerificationToken;
  if (!token) {
    token = require('crypto').randomBytes(32).toString('hex');
    await prisma.user.update({ where: { id: user.id }, data: { emailVerificationToken: token } });
  }
  const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/verify?token=${token}`;
  const html = getVerificationEmailHtml({ name: user.name || user.email, verificationUrl });
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: 'Verify your EDM account',
    html,
  });
  return NextResponse.json({ message: 'Verification email resent.' });
}
