import { prisma } from '../src/lib/db/prisma'

async function main() {
  try {
    await prisma.$connect()
    const users = await prisma.user.findMany()
    console.log('Database connection successful!')
    console.log(`Found ${users.length} users in the database`)
    return true
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
