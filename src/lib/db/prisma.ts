import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  console.log('Initializing Prisma Client with DATABASE_URL:', 
    process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@')); // Log URL with hidden credentials
    
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      },
    },
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });

  // Create a function to handle retries
  async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
    let retries = 3;
    let lastError: Error | unknown;
    
    while (retries > 0) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        console.error(`Database operation failed, retries left: ${retries - 1}`, error);
        retries--;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
        }
      }
    }
    throw lastError;
  }

  // Add connection retry logic
  const originalConnect = prisma.$connect.bind(prisma);
  prisma.$connect = () => withRetry(() => originalConnect());

  return prisma;
};

// Function to test database connection
export async function testConnection() {
  try {
    const client = prismaClientSingleton();
    console.log('Testing database connection...');
    await client.$connect();
    console.log('Connection established, testing query...');
    await client.$queryRaw`SELECT 1`;
    console.log('Query successful, disconnecting...');
    await client.$disconnect();
    return true;
  } catch (error) {
    console.error('Database connection test failed:', {
      error,
      url: process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@')
    });
    return false;
  }
}

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
