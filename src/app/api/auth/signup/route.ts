// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db/users';
import { encrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // One week in seconds

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields (email, password, name).' }, { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters long.'}, { status: 400 });
    }


    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists.' }, { status: 409 }); // 409 Conflict
    }

    const newUser = await createUser(email, password, name);
    if (!newUser) {
      return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 });
    }

    // Create session
    const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000);
    const sessionPayload = {
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      expires,
    };

    const encryptedSession = await encrypt(sessionPayload);

    cookies().set('session', encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });

    const { hashedPassword, ...userWithoutPassword } = newUser;


    return NextResponse.json({ message: 'User created successfully', user: userWithoutPassword }, { status: 201 });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong during signup.' }, { status: 500 });
  }
}
