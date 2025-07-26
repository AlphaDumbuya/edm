import { PrismaClient, Event, EventReminder, User } from '@prisma/client';
const prisma = new PrismaClient();

async function testEventReminders() {
  try {
    // Use fresh Date object for each calculation to ensure accuracy
    const now = new Date();
    console.log('Current time:', now.toLocaleString());
    
    // Add a small buffer to ensure events are definitely in the future
    const buffer = 2 * 60 * 1000; // 2 minutes
    
    // Create two events (30 mins and 24 hours from now)
    const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60 * 1000 + buffer);
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000 + buffer);
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000 + buffer);

    // Format time as HH:mm in GMT+1 timezone
    const formatTime = (date: Date) => {
      // Convert to GMT+1
      const gmt1Date = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/London' }));
      const hours = gmt1Date.getHours().toString().padStart(2, '0');
      const minutes = gmt1Date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    // Create three events with different timings
    const [thirtyMinEvent, oneHourEvent, twentyFourHourEvent] = await Promise.all([
      // 30-minute event
      prisma.event.create({
        data: {
          title: "30min - Test Event",
          description: "This is a test event scheduled to start in 30 minutes.",
          date: thirtyMinsFromNow,
          time: formatTime(thirtyMinsFromNow),
          location: "Virtual",
          isVirtual: true,
          onlineLink: "https://meet.google.com/test-30min"
        }
      }),
      // 1-hour event
      prisma.event.create({
        data: {
          title: "1hour - Test Event",
          description: "This is a test event scheduled to start in 1 hour.",
          date: oneHourFromNow,
          time: formatTime(oneHourFromNow),
          location: "Virtual",
          isVirtual: true,
          onlineLink: "https://meet.google.com/test-1hour"
        }
      }),
      // 24-hour event
      prisma.event.create({
        data: {
          title: "24hour - Test Event",
          description: "This is a test event scheduled to start in 24 hours.",
          date: twentyFourHoursFromNow,
          time: formatTime(twentyFourHoursFromNow),
          location: "Virtual",
          isVirtual: true,
          onlineLink: "https://meet.google.com/test-24hour"
        }
      })
    ]);

    console.log('Created events:', { 
      thirtyMinEvent: { id: thirtyMinEvent.id, title: thirtyMinEvent.title, date: thirtyMinEvent.date, time: thirtyMinEvent.time },
      oneHourEvent: { id: oneHourEvent.id, title: oneHourEvent.title, date: oneHourEvent.date, time: oneHourEvent.time },
      twentyFourHourEvent: { id: twentyFourHourEvent.id, title: twentyFourHourEvent.title, date: twentyFourHourEvent.date, time: twentyFourHourEvent.time }
    });

    // Create a test user if not exists
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
    type ReminderType = '24h' | '1h' | '30m';
    
    const createReminder = async (
      type: ReminderType,
      event: Event,
      user: User,
      minutesBefore: number
    ) => {
      // Use fresh Date for each check
      const currentTime = new Date();
      const scheduledFor = new Date(event.date.getTime() - (minutesBefore * 60 * 1000));
      
      console.log(`\nAnalyzing ${type} reminder for "${event.title}"`);
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
        console.log(`\nEmail template for ${type} reminder:`);

        if (type === '24h') {
          console.log([
            'Event Reminder: ' + event.title,
            'Hello ' + user.name + ',',
            '',
            'This is a reminder that your event starts in 24 hours.',
            '',
            'Event: ' + event.title,
            '',
            'Date & Time: ' + event.date.toLocaleDateString() + ' at ' + event.date.toLocaleTimeString('en-US', { 
              hour: 'numeric',
              minute: '2-digit',
              hour12: true 
            }) + ' GMT+1',
            '',
            (!event.isVirtual ? 'Location: ' + event.location : ''),
            '',
            'We look forward to seeing you!',
            '',
            'Best regards,',
            'EDM Team'
          ].join('\n'));
        } else if (type === '1h') {
          console.log([
            'Event Reminder: ' + event.title,
            'Hello ' + user.name + ',',
            '',
            'This is a reminder that your event starts in 1 hour.',
            '',
            'Event: ' + event.title,
            '',
            'Date & Time: ' + event.date.toLocaleDateString() + ' at ' + event.date.toLocaleTimeString('en-US', { 
              hour: 'numeric',
              minute: '2-digit',
              hour12: true 
            }) + ' GMT+1',
            '',
            (!event.isVirtual ? 'Location: ' + event.location : 'The event link will be sent to you in a separate email 30 minutes before the event starts.'),
            '',
            'We look forward to seeing you!',
            '',
            'Best regards,',
            'EDM Team'
          ].join('\n'));
        } else if (type === '30m') {
          console.log([
            'Event Reminder: ' + event.title,
            'Hello ' + user.name + ',',
            '',
            'This is a reminder that your event starts in 30 minutes.',
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
          ].join('\n'));
        }
        console.log(`✓ Created ${type} reminder in database with appropriate message template`);
      } else {
        console.log(`✗ Cannot create reminder - scheduled time would be ${Math.round((currentTime.getTime() - scheduledFor.getTime()) / (60 * 1000))} minutes in the past`);
      }
    };

    console.log('\nCreating reminders...');

    // Create reminders for 30-minute event
    await createReminder('30m', thirtyMinEvent, user, 30);

    // Create reminders for 1-hour event
    await createReminder('1h', oneHourEvent, user, 60);
    await createReminder('30m', oneHourEvent, user, 30);

    // Create reminders for 24-hour event
    await createReminder('24h', twentyFourHourEvent, user, 24 * 60);
    await createReminder('1h', twentyFourHourEvent, user, 60);
    await createReminder('30m', twentyFourHourEvent, user, 30);

    // Verify reminders were created
    const reminders = await prisma.eventReminder.findMany({
      where: {
        OR: [
          { eventId: thirtyMinEvent.id },
          { eventId: oneHourEvent.id },
          { eventId: twentyFourHourEvent.id }
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

    console.log('\nScheduled reminders:');
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

    console.log('\nSetup complete!');
    console.log('Next steps:');
    console.log('1. Reminders will be processed automatically by the cron job');
    console.log('2. You can manually trigger reminder processing by calling:');
    console.log('   curl -X POST http://localhost:9003/api/reminders/process');
    console.log('3. Check your email for reminders at exactly:');
    console.log(`   - 30 minutes before the Bible Study Session`);
    console.log(`   - 24 hours, 1 hour, and 30 minutes before the Prayer & Worship Service`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testEventReminders().catch(console.error);
