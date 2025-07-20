import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  // In production, try the direct URL first
  const connectionUrl = process.env.NODE_ENV === 'production' 
    ? process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL
    : process.env.DATABASE_URL;

  console.log('Initializing Prisma Client with URL:', 
    connectionUrl?.replace(/\/\/.*:.*@/, '//****:****@'),
    'Environment:', process.env.NODE_ENV); // Log URL with hidden credentials and environment
    
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: connectionUrl
      },
    },
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });

  // Create a function to handle retries
  async function withRetry<T>(operation: () => Promise<T>, retryCount = 3): Promise<T> {
    let lastError: Error | unknown;
    let backoffTime = 1000; // Start with 1 second

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        
        // Log detailed error information
        console.error(`Database operation failed (Attempt ${attempt}/${retryCount}):`, {
          error: error.message,
          code: error.code,
          meta: error.meta,
          stack: error.stack?.split('\n').slice(0, 3),
          connectionUrl: process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@'),
          environment: process.env.NODE_ENV
        });

        if (attempt < retryCount) {
          // Exponential backoff with jitter
          const jitter = Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, backoffTime + jitter));
          backoffTime *= 2; // Double the backoff time for next attempt
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
  const client = prismaClientSingleton();
  try {
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@'),
      DIRECT_URL: process.env.DIRECT_DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@')
    });
    
    console.log('Testing database connection...');
    await withRetry(() => client.$connect(), 5);
    
    console.log('Connection established, testing query...');
    withRetry(async () => {
      const result = await client.$queryRaw`SELECT current_timestamp, version()`;
      console.log('Database info:', result);
      return result;
    }, 3);
    
    console.log('Query successful, disconnecting...');
    await client.$disconnect();
    return true;
  } catch (error: any) {
    console.error('Database connection test failed:', {
      error: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack?.split('\n').slice(0, 3)
    });
    return false;
  } finally {
    try {
      await client.$disconnect();
    } catch (e) {
      console.error('Error disconnecting:', e);
    }
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
function withRetry<T>(operation: () => Promise<T>, retryCount = 3): Promise<T> {
  throw new Error('Function not implemented.');
}

