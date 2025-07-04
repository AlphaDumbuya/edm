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
    return NextResponse.json({ message: 'Email already verified. You can now log in.' });
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true, emailVerificationToken: null },
  });
  return NextResponse.json({ message: 'Email verified successfully. You can now log in.' });
}
