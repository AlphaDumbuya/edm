import { PrismaClient } from '@prisma/client';

const createPrismaClient = () => {
  console.log('Initializing Prisma Client with DATABASE_URL:', 
    process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@')); // Log URL with hidden credentials
    
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      },
    },
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });

  // Add connection retry logic
  client.$connect()
    .catch(async (error) => {
      console.error('Initial connection failed, retrying...', error);
      // Wait 2 seconds and try again
      await new Promise(resolve => setTimeout(resolve, 2000));
      return client.$connect();
    })
    .catch(async (error) => {
      console.error('Second connection attempt failed, retrying...', error);
      // Wait 5 seconds and try one last time
      await new Promise(resolve => setTimeout(resolve, 5000));
      return client.$connect();
    })
    .catch((error) => {
      console.error('All connection attempts failed:', error);
      throw error;
    });

  return client;
};

declare global {
  var prisma: undefined | ReturnType<typeof createPrismaClient>;
}

export const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Function to test database connection with retries
export async function testConnection(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      console.log('Database connection successful!');
      await prisma.$disconnect();
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error);
      if (i < retries - 1) {
        // Wait longer between each retry
        await new Promise(resolve => setTimeout(resolve, (i + 1) * 2000));
      }
    }
  }
  return false;
}

export default prisma;
