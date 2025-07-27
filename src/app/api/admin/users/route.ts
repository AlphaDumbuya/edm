import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db/users';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;
  const role = searchParams.get('role') || undefined;
  const search = searchParams.get('search') || '';
  const { data, success } = await getAllUsers({ offset, limit, role, search });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    // Debug request data
    const headers = Object.fromEntries(req.headers.entries());
    console.log('Received request headers:', headers);
    
    // Get current user from the session token in the cookie
    const cookieHeader = headers.cookie;
    console.log('Cookie header:', cookieHeader);
    
    const cookies = new Map(cookieHeader?.split(';').map(cookie => {
      const [key, value] = cookie.trim().split('=');
      return [key, value];
    }));
    
    console.log('Parsed cookies:', Object.fromEntries(cookies.entries()));
    
    const sessionJwt = cookies.get('session');
    console.log('Session JWT:', sessionJwt);
    
    if (!sessionJwt) {
      console.log('No session JWT found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    let currentUser;
    
    // Parse the JWT to get user information
    try {
      const [headerB64, payloadB64] = sessionJwt.split('.');
      const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
      console.log('Decoded session:', payload);
      
      if (!payload.userId || !payload.email) {
        console.log('Invalid session payload');
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }
      
      // Get current user directly from database using userId from JWT
      currentUser = await prisma.user.findUnique({
        where: { 
          id: payload.userId 
        },
        select: {
          email: true,
          role: true
        }
      });
      
      if (!currentUser || currentUser.email !== payload.email) {
        console.log('User not found or email mismatch');
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }
    } catch (error) {
      console.error('Error decoding session:', error);
      return NextResponse.json({ error: 'Invalid session format' }, { status: 401 });
    }
    
    console.log('Database user:', currentUser);
    
    if (!currentUser) {
      console.log('User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }
    
    // Type assertion and role check
    const userRole = currentUser.role;
    console.log('User role from database:', userRole);
    
    if (!userRole) {
      return NextResponse.json({ error: 'Role not found in session' }, { status: 401 });
    }
    
    if (userRole !== 'SUPER_ADMIN') {
      return NextResponse.json({ 
        error: `Not authorized. Required role: SUPER_ADMIN, Current role: ${userRole}` 
      }, { status: 403 });
    }

    const data = await req.json();
    const { name, email, password, role } = data;

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword, // Using the correct field name from Prisma schema
        role,
        emailVerified: true, // Set emailVerified to true for admin-created users
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Exclude hashedPassword from the response
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
