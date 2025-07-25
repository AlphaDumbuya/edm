/// <reference types="@prisma/client" />
// src/lib/db/users.ts
import prisma from './prisma';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
// @ts-ignore
type PrismaUser = Prisma.User; // Import User type from Prisma namespace

// @ts-ignore
// Define a slightly simplified User type for application use if needed, or use PrismaUser directly
export interface AppUser {
  id: string;
  email: string;
  name?: string | null;
  // Do not include hashedPassword in AppUser that might be sent to client
}

export async function findUserByEmail(email: string): Promise<PrismaUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log('[findUserByEmail] User fetched from DB:', user);
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
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
  data: { users: AppUser[]; totalCount: number };
  success: boolean;
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
      data: { users, totalCount },
      success: true
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      data: { users: [], totalCount: 0 },
      success: false
    };
  }
}

export async function createUser(email: string, plainPassword_1: string, name?: string): Promise<PrismaUser | null> {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword_1, 10);
    const emailVerificationToken = randomBytes(32).toString('hex');
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: name || null,
        emailVerified: false,
        emailVerificationToken,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    // Consider more specific error handling, e.g., for unique constraint violation on email
    return null;
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

export async function updateUser(userId: string, data: { name?: string | null; email?: string; role?: string }): Promise<PrismaUser | null> {
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
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
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
