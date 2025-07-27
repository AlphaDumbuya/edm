import { prisma } from '../src/lib/prisma';
import * as bcrypt from 'bcryptjs';

async function setUserPassword() {
  const email = 'alphadumbuya7@gmail.com';
  
  try {
    // First, let's check if the user exists and show their current status
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        hashedPassword: true,
        role: true,
        createdAt: true
      }
    });

    console.log('Current user status:', existingUser);

    if (!existingUser) {
      console.log('User not found in database');
      return;
    }

    // Now set the password
    const newPassword = 'Admin@123'; // This is a temporary password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update user with NextAuth.js compatible fields
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { 
        hashedPassword,
        role: 'SUPER_ADMIN',
        emailVerified: true,
        updatedAt: new Date(),
      },
    });

    console.log('\nPassword set successfully!');
    console.log('Updated user details:', {
      email: updatedUser.email,
      role: updatedUser.role,
      emailVerified: updatedUser.emailVerified
    });
    console.log('\nYou can now log in with:');
    console.log('Email:', email);
    console.log('Password:', newPassword);
    console.log('\nPlease change your password after logging in!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setUserPassword();
