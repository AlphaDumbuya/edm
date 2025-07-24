import { PrismaClient } from '@prisma/client'
import { checkReminders } from './check-reminders'

async function testCheckReminders() {
  const prisma = new PrismaClient()
  console.log('Starting reminder test...')

  try {
    const eventId = '7a2352d6-ac45-413d-9950-792be17d59f6'
    
    // Check current reminders
    const currentReminders = await prisma.$queryRaw<Array<{ type: string, createdAt: Date }>>`
      SELECT type, "createdAt" 
      FROM "SentReminder" 
      WHERE "eventId"::uuid = ${eventId}::uuid
    `
    
    console.log('Current reminders:', currentReminders)
    
    // Test reminder check
    await checkReminders(eventId)
    
    // Check reminders after running
    const newReminders = await prisma.$queryRaw<Array<{ type: string, createdAt: Date }>>`
      SELECT type, "createdAt" 
      FROM "SentReminder" 
      WHERE "eventId"::uuid = ${eventId}::uuid
    `
    
    console.log('New reminders:', newReminders)
    
  } catch (error) {
    console.error('Test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testCheckReminders()
