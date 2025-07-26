import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  // Get and decrypt session cookie
  const sessionCookie = (await cookies()).get('session')?.value;
  const session = await decrypt(sessionCookie);
  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || !user.hashedPassword) {
    return NextResponse.json({ error: 'User not found or no password set' }, { status: 404 });
  }
  const valid = await bcrypt.compare(currentPassword, user.hashedPassword);
  if (!valid) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { hashedPassword: hashed } });
  return NextResponse.json({ success: true });
}
