import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAndFixVerification() {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        email: 'alphadumbuya7@gmail.com'
      }
    });

    console.log('Current user state:', user);

    if (user && !user.emailVerified && !user.emailVerificationToken) {
      // User has completed verification but flag wasn't set
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: { 
          emailVerified: true
        }
      });
      console.log('Updated user verification status:', updated);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndFixVerification();
