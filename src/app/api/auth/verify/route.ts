// src/app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

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
    
    // Use a transaction to ensure both updates happen
    const updatedUser = await prisma.$transaction(async (tx) => {
      // First update: set email as verified
      const verifiedUser = await tx.user.update({
        where: { id: user.id },
        data: { emailVerified: true }
      });
      
      // Second update: clear the verification token
      return await tx.user.update({
        where: { id: user.id },
        data: { emailVerificationToken: null }
      });
    });

    // Double-check the update was successful
    const verificationCheck = await prisma.user.findUnique({
      where: { id: user.id },
      select: { emailVerified: true, emailVerificationToken: true }
    });

    console.log('User verified successfully:', {
      email: updatedUser.email,
      verified: verificationCheck?.emailVerified,
      token: verificationCheck?.emailVerificationToken
    });

    if (!verificationCheck?.emailVerified) {
      throw new Error('Verification flag not set properly');
    }

    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    console.error('Error updating user verification status:', err);
    return NextResponse.json({ error: 'Failed to verify email. Please try again later.' }, { status: 500 });
  }
}
