import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  try {
    const result = await prisma.$connect()
    console.log('Database connection successful!')
    return result
  } catch (e) {
    console.error('Database connection failed:', e)
    throw e
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
