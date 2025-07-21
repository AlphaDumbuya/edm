import { PrismaClient } from '@prisma/client';

function getConnectionParams() {
  // Base configuration
  const params = new URLSearchParams({
    'connect_timeout': '20',
    'pool_timeout': '10',
    'socket_timeout': '20',
    'statement_cache_size': '0', // Disable statement cache to prevent memory issues
    'sslmode': 'require', // Force SSL
    'application_name': 'edm_vercel',
    'options': '--cluster=ep-green-darkness-abzix6ii', // Add cluster option for Neon
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
  params.set('sslcert', 'neondb_root_cert'); // Neon's root certificate
  params.set('ssl', 'true');
  params.set('sslmode', 'verify-full');

  return params;
}

function createPrismaClient() {
  // Use DIRECT_DATABASE_URL in production for better reliability
  const connectionString = process.env.NODE_ENV === 'production'
    ? process.env.DIRECT_DATABASE_URL
    : process.env.DATABASE_URL;

  // Get base URL without query parameters
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
  });

  // Add our optimized parameters
  const params = getConnectionParams();
  const url = `${baseUrl}?${params.toString()}`;

  // Create client with logging in development
  const prisma = new PrismaClient({
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
