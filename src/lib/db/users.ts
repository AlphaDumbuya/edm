/// <reference types="@prisma/client" />
// src/lib/db/users.ts
import prisma from './prisma-vercel';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PrismaClient } from '.prisma/client';

type PrismaUser = NonNullable<Awaited<ReturnType<PrismaClient['user']['findUnique']>>>;

// @ts-ignore
// Define a slightly simplified User type for application use if needed, or use PrismaUser directly
export interface AppUser {
  id: string;
  email: string;
  name?: string | null;
  // Do not include hashedPassword in AppUser that might be sent to client
}

export async function findUserByEmail(email: string): Promise<PrismaUser | null> {
  if (!email) {
    console.warn('findUserByEmail called with empty email');
    return null;
  }
  
  try {
    // Test connection first
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connection successful');

    const normalizedEmail = email.toLowerCase().trim();
    console.log('Looking up user with email:', normalizedEmail);
    
    // Add explicit select to include necessary fields
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        hashedPassword: true,
        emailVerified: true,
        emailVerificationToken: true,
        role: true,
      }
    });

    console.log('[findUserByEmail] User search result:', { 
      email: normalizedEmail, 
      found: !!user,
      userData: user ? {
        id: user.id,
        createdAt: user.createdAt,
        emailVerified: user.emailVerified,
        hasPassword: !!user.hashedPassword
      } : null
    });

    return user;
  } catch (error: any) {
    console.error('Error finding user by email:', {
      error: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack?.split('\n').slice(0, 3)
    });
    // Re-throw the error to handle it in the signup route
    throw error;
  }
}

interface GetAllUsersOptions {
  search?: string;
  role?: string; // Assuming you'll add a role field later
  offset?: number;
  limit?: number;
  orderBy?: any; // Prisma orderBy type
}
export async function findUserById(id: string): Promise<AppUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { // Only select fields safe to expose or use in session
        id: true,
        email: true,
        name: true,
      }
    });
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
}

export async function getAllUsers(options: GetAllUsersOptions = {}): Promise<{
  data: AppUser[];
  success: boolean;
  users: AppUser[];
  totalCount: number;
}> {
  const { search, role, offset, limit, orderBy } = options;

  const where: any = {};

  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (role) {
    where.role = role; // Assuming a 'role' field exists in your User model
  }

  try {
    const users = await prisma.user.findMany({
      where,
      select: { // Only select fields safe to expose
        id: true,
        email: true,
        name: true,
      },
      skip: offset,
      take: limit,
    });
    const totalCount = await prisma.user.count({ where });
    return { 
      data: users,
      success: true,
      users, 
      totalCount 
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { 
      data: [],
      success: false,
      users: [], 
      totalCount: 0 
    };
  }
}

export async function createUser(email: string, plainPassword: string, name?: string): Promise<PrismaUser | null> {
  if (!email || !plainPassword) {
    console.error('createUser called with missing required fields');
    return null;
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    console.log('Starting user creation process for:', normalizedEmail);
    
    // Wrap everything in a transaction for atomicity
    const user = await prisma.$transaction(async (tx: { user: { findUnique: (arg0: { where: { email: string; }; select: { id: boolean; }; }) => any; create: (arg0: { data: { email: string; hashedPassword: string; name: string | null; emailVerified: boolean; emailVerificationToken: string; }; }) => any; }; }) => {
      // Double-check for existing user within transaction
      const existing = await tx.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true }
      });
      
      if (existing) {
        throw new Error('EMAIL_EXISTS');
      }

      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      console.log('Password hashed successfully');
      
      const emailVerificationToken = randomBytes(32).toString('hex');
      console.log('Generated verification token');
      
      return tx.user.create({
        data: {
          email: normalizedEmail,
          hashedPassword,
          name: name?.trim() || null,
          emailVerified: false,
          emailVerificationToken,
        },
      });
    }, {
      maxWait: 10000, // 10s max wait time
      timeout: 15000, // 15s timeout
    });

    console.log('User created successfully:', {
      id: user.id,
      email: user.email,
      hasToken: !!user.emailVerificationToken
    });
    
    return user;
  } catch (error: any) {
    console.error('Error creating user:', {
      error: error.message,
      code: error.code,
      meta: error.meta,
      name: error.name,
      stack: error.stack
    });

    // Throw specific errors for better handling
    if (error.code === 'P2002') {
      throw new Error('Email already exists');
    }
    
    throw error; // Re-throw the error to be handled by the API route
  }
}

export async function verifyPassword(plainPassword_1: string, hashedPassword_1: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainPassword_1, hashedPassword_1);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

export async function deleteUser(userId: string): Promise<PrismaUser | null> {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    return null;
  }
}

export async function updateUser(userId: string, data: { name?: string | null; email?: string; role?: string; emailVerified?: boolean }): Promise<PrismaUser | null> {
  try {
    const updateData: any = { ...data };
    if (updateData.role && typeof updateData.role === 'string') {
      // Ensure role is a valid enum value
      updateData.role = updateData.role.toUpperCase();
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    
    console.log('User updated:', {
      id: updatedUser.id,
      emailVerified: updatedUser.emailVerified,
      role: updatedUser.role,
      updatedFields: Object.keys(data)
    });
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export async function setEmailVerified(userId: string, verified: boolean = true): Promise<PrismaUser | null> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { 
        emailVerified: verified,
        ...(verified ? { emailVerificationToken: null } : {})
      }
    });
    console.log('Email verification status updated:', {
      userId,
      email: user.email,
      verified,
      success: true
    });
    return user;
  } catch (error) {
    console.error('Error updating email verification status:', error);
    return null;
  }
}

export async function setUserRole(userId: string, role: string): Promise<PrismaUser | null> {
  try {
    const normalizedRole = role.toUpperCase();
    console.log('Setting user role:', { userId, role: normalizedRole });
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: normalizedRole }
    });
    
    console.log('User role updated:', {
      userId,
      email: user.email,
      role: user.role,
      success: true
    });
    
    return user;
  } catch (error) {
    console.error('Error updating user role:', error);
    return null;
  }
}

// Placeholder for session creation - Neon DB sessions will be handled by session.ts
// This can be expanded for database-backed sessions if needed later.
export async function createDbSession(userId: string, expiresAt: Date) {
  try {
    const session = await prisma.session.create({
      data: {
        userId,
        expiresAt,
      },
    });
    return session;
  } catch (error) {
    console.error('Error creating DB session:', error);
    return null;
  }
}

export async function getDbSession(sessionId: string) {
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) { // Session expired
      await prisma.session.delete({ where: { id: sessionId }});
    }
    return null;
  } catch (error) {
    console.error('Error getting DB session:', error);
    return null;
  }
}

export async function deleteDbSession(sessionId: string) {
  try {
    await prisma.session.delete({
      where: { id: sessionId },
    });
  } catch (error) {
    console.error('Error deleting DB session:', error);
    // Fail silently or handle as appropriate
  }
}

export async function getUserCount() {
  try {
    const count = await prisma.user.count();
    return count;
  } catch (error) {
    console.error("Error getting user count:", error);
    throw error;
  }
}

export async function deleteUserDbSessions(userId: string) {
    try {
        await prisma.session.deleteMany({
            where: { userId: userId }
        });
    } catch (error) {
        console.error('Error deleting user DB sessions:', error);
    }
}
