// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
    console.log("Prisma client initialized in development.");
  }
  prisma = globalThis.prisma;
}

if (process.env.NODE_ENV !== 'production') {
  console.log("Exporting prisma client:", prisma);
}

export default prisma;
