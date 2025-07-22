import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const getPrismaClient = () => {
  if (process.env.NEXT_RUNTIME === 'edge') {
    // In edge runtime, we need to use the Neon adapter
    const connectionString = process.env.DATABASE_URL!.replace('postgresql://', 'prisma://')
    const adapter = new PrismaNeon({ connectionString })
    return new PrismaClient({ adapter })
  }

  // In Node.js runtime, we can use the default client
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient()
  }
  return globalForPrisma.prisma
}

export const db = getPrismaClient()
