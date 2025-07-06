// src/app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Invalid or missing token.' }, { status: 400 });
  }
  const user = await prisma.user.findFirst({ where: { emailVerificationToken: token } });
  if (!user) {
    // Try to find by token being already used (null) or already verified
    const alreadyVerifiedUser = await prisma.user.findFirst({
      where: {
        emailVerificationToken: null,
        emailVerified: true,
      },
    });
    if (alreadyVerifiedUser) {
      return NextResponse.json({ message: 'Email already verified. You can now log in.' });
    }
    return NextResponse.json({ message: 'This verification link is invalid or has already been used.' });
  }
  if (user.emailVerified) {
    console.log('User already verified:', user.email);
    return NextResponse.json({ message: 'Email already verified. You can now log in.' });
  }
  try {
    console.log('Attempting to verify user:', user.email, 'with id:', user.id);
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailVerificationToken: null },
    });
    console.log('User verified successfully:', updatedUser.email, 'Status:', updatedUser.emailVerified);
    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    console.error('Error updating user verification status:', err);
    return NextResponse.json({ error: 'Failed to verify email. Please try again later.' }, { status: 500 });
  }
}
