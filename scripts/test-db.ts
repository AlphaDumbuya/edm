import prisma from '../src/lib/db/prisma';

async function testConnection() {
    try {
        await prisma.$connect();
        const count = await prisma.user.count();
        console.log('Connection successful! User count:', count);
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
