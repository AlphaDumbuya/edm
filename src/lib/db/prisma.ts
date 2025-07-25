// src/lib/db/prisma.ts
import { PrismaClient, Prisma } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient | undefined;

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: [
    { level: 'query', emit: 'stdout' } as const,
    { level: 'error', emit: 'stdout' } as const,
    { level: 'warn', emit: 'stdout' } as const
  ],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
};

async function initPrismaClient() {
  const maxRetries = 5; // Increased from 3 to 5
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const client = new PrismaClient(prismaClientOptions);
      
      // Test the connection with a timeout
      const connectPromise = client.$connect();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 30000) // 30 second timeout
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      
      // Test the connection with a simple query
      await client.$queryRaw`SELECT 1`;
      
      console.log('Successfully connected to the database');
      return client;
    } catch (error) {
      retries++;
      console.error(`Failed to connect to database (attempt ${retries}/${maxRetries}):`, error);
      
      if (retries === maxRetries) {
        throw new Error(`Failed to connect to database after ${maxRetries} attempts`);
      }
      
      // Exponential backoff with a maximum of 10 seconds
      const backoffTime = Math.min(Math.pow(2, retries) * 1000, 10000);
      console.log(`Waiting ${backoffTime}ms before retrying...`);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }
  
  throw new Error('Failed to initialize Prisma client');
}

if (process.env.NODE_ENV === 'production') {
  prisma = await initPrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = await initPrismaClient();
    console.log("Prisma client initialized in development with retry logic.");
  }
  prisma = globalThis.prisma;
}

if (process.env.NODE_ENV !== 'production') {
  console.log("Exporting prisma client:", prisma);
}

export default prisma;
