import { PrismaClient as PrismaClientType } from '.prisma/client';

function getConnectionParams() {
  // Base configuration
  const params = new URLSearchParams({
    'connect_timeout': '20',
    'pool_timeout': '10',
    'socket_timeout': '20',
    'statement_cache_size': '0', // Disable statement cache to prevent memory issues
    'sslmode': 'require', // Force SSL
    'application_name': 'edm_vercel',
    'schema': 'public', // Ensure correct schema
  });

  // Vercel-specific optimizations
  if (process.env.VERCEL === '1') {
    params.set('pgbouncer', 'true'); // Enable pgBouncer mode
    params.set('connection_limit', '1'); // Limit connections in serverless
    params.set('pool_timeout', '10'); // Shorter pool timeout for serverless
    params.set('application_name', 'edm_vercel_prod');
  } else {
    params.set('max_connections', '3'); // Fewer connections for non-serverless
    params.set('pool_timeout', '20'); // Longer pool timeout for non-serverless
    params.set('application_name', 'edm_vercel_dev');
  }
  
  // Add SSL parameters for Neon
  // In development, we'll use a less strict SSL mode
  if (process.env.NODE_ENV === 'development') {
    params.set('sslmode', 'prefer');
  } else {
    params.set('sslmode', 'verify-full');
  }
  
  params.set('ssl', 'true');
  return params;
}

function createPrismaClient() {
  // In production, use Prisma Accelerate URL if available, then fallback to DIRECT_URL, then DATABASE_URL
  const connectionString = process.env.NODE_ENV === 'production'
    ? process.env.PRISMA_ACCELERATE_URL || process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL
    : process.env.DATABASE_URL;

  // Handle Prisma Accelerate URL specially as it doesn't need additional parameters
  if (connectionString?.startsWith('prisma://')) {
    return new PrismaClientType({
      log: ['error'],
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });
  }

  // For regular database URLs, get base URL without query parameters
  const baseUrl = connectionString?.split('?')[0];
  if (!baseUrl) {
    throw new Error('Database URL is not set');
  }

  // Log environment info (masked)
  console.log('Database initialization:', {
    env: process.env.NODE_ENV,
    isVercel: process.env.VERCEL === '1',
    region: process.env.VERCEL_REGION,
    hasDirectUrl: !!process.env.DIRECT_DATABASE_URL,
    hasUrl: !!process.env.DATABASE_URL,
    hasAccelerateUrl: !!process.env.PRISMA_ACCELERATE_URL,
    urlType: connectionString?.startsWith('prisma://') ? 'accelerate' : 'postgres'
  });

  // Add our optimized parameters for PostgreSQL connections
  const params = getConnectionParams();
  const url = `${baseUrl}?${params.toString()}`;

  // Create client with logging in development
  const prisma = new PrismaClientType({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn']
      : ['error'],
    datasources: {
      db: {
        url,
      },
    },
    // Force SSL in production
    // This is important for Vercel
    // SSL enforcement should be handled via your DATABASE_URL or database configuration.
  });

  // Add connection handling
  const originalConnect = prisma.$connect.bind(prisma);
  prisma.$connect = async () => {
    try {
      console.log('Connecting to database...');
      await originalConnect();
      console.log('Database connected successfully');
    } catch (error: any) {
      console.error('Database connection failed:', {
        error: error.message,
        code: error.code,
        meta: error.meta,
      });
      throw error;
    }
  };

  return prisma;
}

// Singleton instance
declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
