import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  // In production, use pooled connection for web requests and direct connection for background jobs
  let connectionUrl;
  if (process.env.NODE_ENV === 'production') {
    // Check if this is a background process/job
    const isBackgroundJob = process.env.IS_BACKGROUND_JOB === 'true';
    connectionUrl = isBackgroundJob ? process.env.DIRECT_DATABASE_URL : process.env.DATABASE_URL;
  } else {
    connectionUrl = process.env.DATABASE_URL;
  }

  if (!connectionUrl) {
    throw new Error('Database connection URL is not set');
  }

  // Convert postgresql:// to postgres:// if needed
  const normalizedUrl = connectionUrl.replace(/^postgresql:\/\//, 'postgres://');

  console.log('Initializing Prisma Client:', { 
    url: normalizedUrl.replace(/\/\/.*:.*@/, '//****:****@'),
    env: process.env.NODE_ENV,
    isDirect: !normalizedUrl.includes('-pooler')
  });
    
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: normalizedUrl
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
        
        // Check if this is a connection error that we should retry
        const shouldRetry = error.code === 'P1001' || // Connection error
                           error.code === 'P1002' || // Connection timed out
                           error.code === 'P1017' || // Server closed the connection
                           error.code === 'P1024' || // Connection pool timeout
                           error.code === 'P2023' || // Inconsistent column data
                           error.code === 'P2034';   // Transaction rollback

        if (!shouldRetry) {
          throw error; // Don't retry on other types of errors
        }
        
        // Log detailed error information
        console.error(`Database operation failed (Attempt ${attempt}/${retryCount}):`, {
          error: error.message,
          code: error.code,
          meta: error.meta,
          stack: error.stack?.split('\n').slice(0, 3),
          connectionUrl: process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@'),
          environment: process.env.NODE_ENV,
          retryIn: `${backoffTime}ms`
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

