import { PrismaClient } from '@prisma/client'

async function checkEvent() {
  const prisma = new PrismaClient()
  console.log('Checking event details...')

  try {
    const eventId = '7a2352d6-ac45-413d-9950-792be17d59f6'
    
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })
    
    console.log('Event details:', {
      id: event?.id,
      title: event?.title,
      date: event?.date,
      time: event?.time
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkEvent()
