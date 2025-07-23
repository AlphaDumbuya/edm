import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

// PATCH: update notification preferences
export async function PATCH(req: NextRequest) {
  const sessionCookie = (await cookies()).get('session')?.value;
  const session = await decrypt(sessionCookie);
  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { emailNotifications, pushNotifications } = await req.json();
  const user = await prisma.user.update({
    where: { id: session.userId },
    data: {
      emailNotifications,
      pushNotifications,
    },
  });
  return NextResponse.json({ success: true, user });
}

// GET: get notification preferences
export async function GET(req: NextRequest) {
  const sessionCookie = (await cookies()).get('session')?.value;
  const session = await decrypt(sessionCookie);
  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      emailNotifications: true,
      pushNotifications: true,
    },
  });
  return NextResponse.json(user);
}
