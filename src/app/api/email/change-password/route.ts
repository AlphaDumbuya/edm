import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { resetPasswordEmail } from '@/emails/reset-password-template';

export async function POST(request: Request) {
  const { user, url, token } = await request.json();

  try {
    // Destructure subject, html, and text from resetPasswordEmail
    const { subject, html, text } = resetPasswordEmail({ resetUrl: url });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    // Log SMTP config for debugging (do not log passwords in production)
    console.log('SMTP config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.EMAIL_FROM_NAME,
    });
    console.log('Sending reset password email to:', user.email);
    console.log('Reset URL:', url);
    try {
      const info = await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject,
        html,
        text,
      });
      console.log('Reset password email sent:', info);
      return NextResponse.json({ message: 'Password reset email sent' });
    } catch (emailError) {
      console.error('Brevo SMTP sendMail error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send password reset email. Please contact support or try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error preparing password reset email:', error);
    return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
  }
}