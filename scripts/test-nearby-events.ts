import { PrismaClient, Event, EventReminder, User } from '@prisma/client';
const prisma = new PrismaClient();

async function testNearbyEvents() {
  try {
    // Use fresh Date object for each calculation to ensure accuracy
    const now = new Date();
    console.log('Current time:', now.toLocaleString());
    
    // Add a small buffer to ensure events are definitely in the future
    const buffer = 1 * 60 * 1000; // 1 minute buffer
    
    // Create events very close to now
    const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000 + buffer);
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000 + buffer);

    // Format time as HH:mm AM/PM
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      });
    };

    // Create two events with different timings
    const [tenMinEvent, fifteenMinEvent] = await Promise.all([
      // 10-minute event
      prisma.event.create({
        data: {
          title: "Quick Test Event (10min)",
          description: "This is a test event starting very soon.",
          date: tenMinutesFromNow,
          time: formatTime(tenMinutesFromNow),
          location: "Virtual",
          isVirtual: true,
          onlineLink: "https://meet.google.com/test-10min"
        }
      }),
      // 15-minute event
      prisma.event.create({
        data: {
          title: "Quick Test Event (15min)",
          description: "This is a test event starting in 15 minutes.",
          date: fifteenMinutesFromNow,
          time: formatTime(fifteenMinutesFromNow),
          location: "Virtual",
          isVirtual: true,
          onlineLink: "https://meet.google.com/test-15min"
        }
      })
    ]);

    console.log('Created events:', { 
      tenMinEvent: { id: tenMinEvent.id, title: tenMinEvent.title, date: tenMinEvent.date, time: tenMinEvent.time },
      fifteenMinEvent: { id: fifteenMinEvent.id, title: fifteenMinEvent.title, date: fifteenMinEvent.date, time: fifteenMinEvent.time }
    });

    // Create or update test user
    const user = await prisma.user.upsert({
      where: {
        email: "alphadumbuya7@gmail.com"
      },
      update: {
        emailNotifications: true
      },
      create: {
        email: "alphadumbuya7@gmail.com",
        name: "Alpha Dumbuya",
        hashedPassword: "test-password-hash",
        role: "USER",
        emailNotifications: true,
        emailVerified: true
      }
    });

    console.log('User ready:', { id: user.id, email: user.email });

    // Create reminders with exact timing
    type ReminderType = '5m';
    
    const createReminder = async (
      type: ReminderType,
      event: Event,
      user: User,
      minutesBefore: number
    ) => {
      // Use fresh Date for each check
      const currentTime = new Date();
      const scheduledFor = new Date(event.date.getTime() - (minutesBefore * 60 * 1000));
      
      console.log(`\\nAnalyzing ${type} reminder for "${event.title}"`);
      console.log(`Event time: ${event.date.toLocaleDateString()} at ${event.date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      })} GMT+1`);
      console.log(`Reminder would be scheduled for: ${scheduledFor.toLocaleDateString()} at ${scheduledFor.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      })} GMT+1`);
      console.log(`Current time: ${currentTime.toLocaleDateString()} at ${currentTime.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      })} GMT+1`);
      
      // Only create reminder if it's in the future
      if (scheduledFor > currentTime) {
        console.log(`✓ Reminder time is in the future (${Math.round((scheduledFor.getTime() - currentTime.getTime()) / (60 * 1000))} minutes from now)`);
        
        // Create the reminder with appropriate message
        await prisma.eventReminder.create({
          data: {
            type,
            eventId: event.id,
            userId: user.id,
            scheduledFor,
            status: 'PENDING'
          }
        });

        // Log what would be sent in the actual email
        console.log(`\\nEmail template for ${type} reminder:`);
        console.log([
          'Event Reminder: ' + event.title,
          'Hello ' + user.name + ',',
          '',
          'This is a reminder that your event starts in 5 minutes.',
          '',
          'Event: ' + event.title,
          '',
          'Date & Time: ' + event.date.toLocaleDateString() + ' at ' + event.date.toLocaleTimeString('en-US', { 
            hour: 'numeric',
            minute: '2-digit',
            hour12: true 
          }) + ' GMT+1',
          '',
          (!event.isVirtual ? 'Location: ' + event.location : 'Online Link: ' + event.onlineLink),
          '',
          'We look forward to seeing you!',
          '',
          'Best regards,',
          'EDM Team'
        ].join('\\n'));
        
        console.log(`✓ Created ${type} reminder in database with appropriate message template`);
      } else {
        console.log(`✗ Cannot create reminder - scheduled time would be ${Math.round((currentTime.getTime() - scheduledFor.getTime()) / (60 * 1000))} minutes in the past`);
      }
    };

    console.log('\\nCreating reminders...');

    // Create 5-minute reminders for both events
    await createReminder('5m', tenMinEvent, user, 5);
    await createReminder('5m', fifteenMinEvent, user, 5);

    // Verify reminders were created
    const reminders = await prisma.eventReminder.findMany({
      where: {
        OR: [
          { eventId: tenMinEvent.id },
          { eventId: fifteenMinEvent.id }
        ],
        userId: user.id
      },
      orderBy: {
        scheduledFor: 'asc'
      },
      include: {
        event: true
      }
    });

    console.log('\\nScheduled reminders:');
    reminders.forEach((reminder: EventReminder & { event: Event }) => {
      const timeUntil = Math.round((reminder.scheduledFor.getTime() - now.getTime()) / (1000 * 60));
      console.log(`- ${reminder.type} reminder for "${reminder.event.title}"`);
      console.log(`  Scheduled for: ${reminder.scheduledFor.toLocaleDateString()} at ${reminder.scheduledFor.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      })} GMT+1`);
      console.log(`  Will send in: ${timeUntil} minutes`);
    });

    console.log('\\nSetup complete!');
    console.log('Next steps:');
    console.log('1. The reminders will be processed automatically by the cron job');
    console.log('2. You can manually trigger reminder processing by calling:');
    console.log('   curl -X GET http://localhost:9003/api/dev/process-reminders');
    console.log('3. Check your email (alphadumbuya7@gmail.com) for the reminders in about 5 minutes');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testNearbyEvents().catch(console.error);
