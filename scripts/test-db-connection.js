const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    // Try to query the database
    console.log('Testing database connection...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Database connection successful!', result);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
