// scripts/fix-email-verification.ts
import { PrismaClient } from '@prisma/client';
import { findUserByEmail, setEmailVerified } from '../src/lib/db/users';

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Please provide an email address');
    process.exit(1);
  }

  try {
    console.log('Looking up user:', email);
    const user = await findUserByEmail(email);
    
    if (!user) {
      console.error('User not found');
      process.exit(1);
    }

    console.log('Current user status:', {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      hasVerificationToken: !!user.emailVerificationToken
    });

    if (!user.emailVerified) {
      console.log('Setting email as verified...');
      const updated = await setEmailVerified(user.id, true);
      if (updated) {
        console.log('Successfully verified user\'s email');
      } else {
        console.error('Failed to verify email');
      }
    } else {
      console.log('User is already verified');
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
