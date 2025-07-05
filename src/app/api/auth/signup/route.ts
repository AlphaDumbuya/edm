// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db/users';
import { encrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { getVerificationEmailHtml } from '@/emails/verification-template';
// @ts-ignore
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    // Password validation (backend, matches frontend requirements)
    const passwordRequirements = [
      { regex: /.{8,}/, message: 'at least 8 characters' },
      { regex: /[A-Z]/, message: 'one uppercase letter' },
      { regex: /[a-z]/, message: 'one lowercase letter' },
      { regex: /[0-9]/, message: 'one number' },
      { regex: /[^A-Za-z0-9]/, message: 'one symbol' },
    ];
    const failed = passwordRequirements.find(r => !r.regex.test(password));
    if (failed) {
      return NextResponse.json({ error: `Password must contain ${failed.message}` }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const newUser = await createUser(email, password, name);
    console.log('User after creation:', newUser); // Debug: check if token is present
    if (!newUser) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }

    // Validate required env vars for SMTP
    const requiredEnv = [
      'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'EMAIL_FROM', 'EMAIL_FROM_NAME'
    ];
    for (const key of requiredEnv) {
      if (!process.env[key]) {
        console.error(`Missing required environment variable: ${key}`);
        return NextResponse.json({ error: `Server misconfiguration. Please contact support.` }, { status: 500 });
      }
    }

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/verify?token=${newUser.emailVerificationToken}`;
    const html = getVerificationEmailHtml({ name: newUser.name || newUser.email, verificationUrl });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log('Preparing to send verification email to:', newUser.email);
    console.log('SMTP config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.EMAIL_FROM_NAME
    });
    console.log('Verification URL:', verificationUrl);
    try {
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`, // Use validated sender
        to: newUser.email,
        subject: 'Verify your EDM account',
        html,
      });
      console.log('Verification email sent successfully to:', newUser.email);
    } catch (emailError) {
      console.error('Brevo SMTP sendMail error:', emailError, { email: newUser.email });
      return NextResponse.json({ error: 'Failed to send verification email. Please contact support or try again later.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Signup successful! Please check your email and verify your account before logging in.' }, { status: 200 });
  } catch (error: any) {
    console.error('Signup API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
