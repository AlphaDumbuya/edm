// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-unused-vars
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    console.log("Prisma client initialized in development."); // Added console.log
  }
  prisma = global.prisma;
}

if (process.env.NODE_ENV !== 'production') {
  console.log("Exporting prisma client:", prisma); // Added console.log
}

export default prisma;
