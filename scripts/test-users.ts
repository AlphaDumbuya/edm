import prisma from '../src/lib/db/prisma-vercel';

async function testUserLookup() {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Connected to database');
    
    console.log('Counting users...');
    const userCount = await prisma.user.count();
    console.log('Total users:', userCount);
    
    console.log('Checking for specific email...');
    const testEmail = 'alphadumbuya7@gmail.com';
    const user = await prisma.user.findUnique({
      where: { email: testEmail }
    });
    console.log('User lookup result:', {
      found: !!user,
      email: testEmail,
    });
    
    if (user) {
      console.log('User details:', {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testUserLookup();
