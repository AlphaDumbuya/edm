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
    const { name, userId, photoURL } = await req.json();
    console.log('[PROFILE PUT] Received:', { name, userId, photoURL });

    if (session.userId !== userId) {
        return NextResponse.json({ error: 'Forbidden: User ID mismatch' }, { status: 403 });
    }

    // Allow updating name, image, or both
    const updateData: any = {};
    if (typeof name === 'string' && name.trim() !== '') {
      updateData.name = name.trim();
    }
    if (typeof photoURL === 'string' && photoURL.trim() !== '') {
      updateData.image = photoURL.trim();
    }
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 });
    }

    console.log('[PROFILE PUT] Update data:', updateData);
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: updateData,
      select: { id: true, email: true, name: true, image: true },
    });
    console.log('[PROFILE PUT] Updated user:', updatedUser);

    // Re-encrypt and set the session cookie with updated fields
    const newSessionPayload: SessionPayload = {
      ...session,
      userId: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      image: updatedUser.image,
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

  } catch (error: any) {
    console.error('[/api/auth/profile PUT] Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile. Please try again.' }, { status: 500 });
  }
}
