require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

console.log('Database URL:', process.env.DATABASE_URL);
console.log('Direct URL:', process.env.DIRECT_DATABASE_URL);

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
