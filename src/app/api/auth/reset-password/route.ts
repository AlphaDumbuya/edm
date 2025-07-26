import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: 'Missing token or password.' }, { status: 400 });
  }
  // Find user by reset token and check expiry
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpiry: { gte: new Date() },
    },
  });
  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired reset token.' }, { status: 400 });
  }
  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 12);
  // Update user password and clear reset token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpiry: null,
    },
  });
  return NextResponse.json({ message: 'Password has been reset successfully.' });
}
