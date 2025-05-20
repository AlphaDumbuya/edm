// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db/users';
import { encrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const newUser = await createUser(email, password, name);
    if (!newUser) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }

    const sessionPayload = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };

    const encryptedSession = await encrypt(sessionPayload);

    // ✅ Correct usage, with temporary bypass for potential Promise issue
    (await cookies() as any).set('session', encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });

    const { hashedPassword, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
