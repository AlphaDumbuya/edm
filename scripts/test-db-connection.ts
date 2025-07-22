import prisma from '../src/lib/db/prisma-vercel';

async function testConnection() {

  try {
    console.log('Testing database connection...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Using URL:', process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@'));

    // Test connection
    await prisma.$connect();
    console.log('Successfully connected to database');

    // Test query
    const result = await prisma.$queryRaw`SELECT current_timestamp, current_database(), version()`;
    console.log('Query result:', result);

    return true;
  } catch (error: any) {
    console.error('Database connection test failed:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testConnection()
  .then(success => {
    if (success) {
      console.log('Database connection test completed successfully');
      process.exit(0);
    } else {
      console.error('Database connection test failed');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
