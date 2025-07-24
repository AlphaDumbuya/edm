import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query']
})

export async function checkReminders(id: string) {
  console.log('Checking reminders for event:', id)

  try {
    // 1. Get event details
    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      throw new Error(`Event not found with ID: ${id}`)
    }

    console.log('Event:', {
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time
    })
    
    // 2. Parse event time
    const eventTime = new Date(event.date)
    const [eventHours, eventMinutes] = event.time.split(':').map(Number)
    eventTime.setHours(eventHours, eventMinutes, 0, 0)
    
    const now = new Date('2025-07-24T12:00:00.000Z') // Using current date from context
    const timeDiff = eventTime.getTime() - now.getTime()
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))
    
    console.log('Now:', now)
    console.log('Event time:', eventTime)
    console.log('Time difference in hours:', hoursDiff)

    // 3. Define reminder times
    const reminderTypes = [
      { type: '24h', threshold: 24 },
      { type: '1h', threshold: 1 },
      { type: '30m', threshold: 0.5 }
    ]

    // 4. Get existing reminders
    const existingReminders = await prisma.$queryRaw<Array<{ type: string }>>`
      SELECT type FROM "SentReminder" WHERE "eventId"::uuid = ${event.id}::uuid
    `

    const sentReminderTypes = existingReminders.map(r => r.type)
    console.log('Existing reminders:', sentReminderTypes)
    console.log('Looking for reminders at', Math.abs(hoursDiff), 'hours from event')

    // 5. Check each reminder type
    for (const { type, threshold } of reminderTypes) {
      const timeUntilThreshold = Math.abs(hoursDiff)
      if (
        timeUntilThreshold <= threshold && 
        timeUntilThreshold > threshold - 0.5 && 
        !sentReminderTypes.includes(type)
      ) {
        // Create new reminder
        await prisma.$executeRaw`
          INSERT INTO "SentReminder" (id, "eventId", type, "createdAt", "updatedAt")
          VALUES (gen_random_uuid(), ${event.id}::uuid, ${type}, NOW(), NOW())
        `

        console.log(`Created ${type} reminder for event ${event.title}`)
      }
    }

  } catch (error) {
    console.error('Error:', error)
  }
}

// When running directly from command line
if (require.main === module) {
  const eventId = process.argv[2]
  if (!eventId) {
    console.error('Please provide an event ID')
    process.exit(1)
  }

  checkReminders(eventId).catch(error => {
    console.error('Error:', error)
    process.exit(1)
  })
}
