// scripts/update-user-status.ts
import { findUserByEmail, setEmailVerified, setUserRole } from '../src/lib/db/users';

async function main() {
  const email = 'alphadumbuya7@gmail.com';
  
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
      role: user.role
    });

    // Update verification status
    const verifiedUser = await setEmailVerified(user.id, true);
    if (verifiedUser) {
      console.log('Successfully verified user\'s email');
    }

    // Update role to SUPER_ADMIN
    const updatedUser = await setUserRole(user.id, 'SUPER_ADMIN');
    if (updatedUser) {
      console.log('Successfully updated user role to SUPER_ADMIN');
    }

    console.log('Final user status:', {
      id: updatedUser?.id,
      email: updatedUser?.email,
      emailVerified: updatedUser?.emailVerified,
      role: updatedUser?.role
    });

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
