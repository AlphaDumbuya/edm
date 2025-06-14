// src/app/api/auth/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt, encrypt, type SessionPayload } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

export async function PUT(req: NextRequest) {
  const sessionCookie = (await cookies()).get('session')?.value;
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized: No session cookie' }, { status: 401 });
  }

  const session = await decrypt(sessionCookie);
  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized: Invalid session' }, { status: 401 });
  }

  try {
    const { name, userId } = await req.json(); // Expecting name and userId

    if (session.userId !== userId) {
        return NextResponse.json({ error: 'Forbidden: User ID mismatch' }, { status: 403 });
    }

    if (name && typeof name === 'string' && name.trim() !== '') {
      const updatedUser = await prisma.user.update({
        where: { id: session.userId },
        data: { name: name.trim() },
        select: { id: true, email: true, name: true }, // Return updated user data
      });

      // Re-encrypt and set the session cookie with updated name
      const newSessionPayload: SessionPayload = {
        ...session, // keep existing iat, exp, etc.
        userId: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      };
      const encryptedSession = await encrypt(newSessionPayload);
      const response = NextResponse.json({ message: 'Profile updated successfully', user: updatedUser }, { status: 200 });
      response.cookies.set('session', encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
        sameSite: 'lax',
      });
      return response;

    } else {
      return NextResponse.json({ error: 'Name is required and must be a non-empty string' }, { status: 400 });
    }

  } catch (error: any) {
    console.error('[/api/auth/profile PUT] Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile. Please try again.' }, { status: 500 });
  }
}
