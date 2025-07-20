import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  console.log('Initializing Prisma Client with DATABASE_URL:', 
    process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//****:****@')); // Log URL with hidden credentials
    
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      },
    },
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });
};

// Function to test database connection
export async function testConnection() {
  try {
    const client = prismaClientSingleton();
    await client.$connect();
    await client.$queryRaw`SELECT 1`;
    await client.$disconnect();
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
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
