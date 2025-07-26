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

    // Format time as HH:mm
    const formatTime = (date: Date) => {
      return date.toTimeString().slice(0, 5);
    };

    // Create both events
    const [shortEvent, longEvent] = await Promise.all([
      // 30-minute event
      prisma.event.create({
        data: {
          title: "Advanced Biblical Studies: Youth Leadership Development Series",
          description: "We cordially invite you to participate in our comprehensive Biblical Studies session designed specifically for emerging youth leaders. This structured discussion will delve into advanced scriptural analysis, practical application strategies, and contemporary faith challenges. Our interactive format ensures meaningful engagement and spiritual growth.",
          date: thirtyMinsFromNow,
          time: formatTime(thirtyMinsFromNow),
          location: "Virtual",
          isVirtual: true,
          onlineLink: "https://meet.google.com/bible-study-session"
        }
      }),
      // 24-hour event
      prisma.event.create({
        data: {
          title: "Divine Worship Service & Intercessory Prayer Summit",
          description: "You are cordially invited to join our distinguished congregation for an enriching worship experience and focused intercessory prayer session. This carefully curated service combines sacred musical worship, guided meditation, and collective prayer for our community's spiritual enrichment. Distinguished speakers will share profound insights on faith, perseverance, and divine guidance.",
          date: twentyFourHoursFromNow,
          time: formatTime(twentyFourHoursFromNow),
          location: "Virtual",
          isVirtual: true,
          onlineLink: "https://meet.google.com/prayer-worship-service"
        }
      })
    ]);

    console.log('Created events:', { 
      shortEvent: { id: shortEvent.id, title: shortEvent.title, date: shortEvent.date, time: shortEvent.time },
      longEvent: { id: longEvent.id, title: longEvent.title, date: longEvent.date, time: longEvent.time }
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
      console.log(`Event time: ${event.date.toLocaleString()}`);
      console.log(`Reminder would be scheduled for: ${scheduledFor.toLocaleString()}`);
      console.log(`Current time: ${currentTime.toLocaleString()}`);
      
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
        // Determine the platform from the URL
        const getPlatform = (url: string | null) => {
          if (!url) return 'our virtual meeting platform';
          if (url.includes('meet.google.com')) return 'Google Meet';
          if (url.includes('zoom.us')) return 'Zoom';
          if (url.includes('teams.microsoft.com')) return 'Microsoft Teams';
          return 'our virtual meeting platform';
        };

        const platform = getPlatform(event.onlineLink);

        if (type === '24h') {
          console.log(`Event Reminder: ${event.title}
Hello ${user.name},

This is a reminder that your event starts in 24 hours.

Event: ${event.title}

Date & Time: ${event.date.toLocaleDateString()} at ${event.time} GMT+1

${!event.isVirtual ? `Location: ${event.location}` : ''}

We look forward to seeing you!

Best regards,
EDM Team`);
        } else if (type === '1h') {
          console.log(`Event Reminder: ${event.title}
Hello ${user.name},

This is a reminder that your event starts in 1 hour.

Event: ${event.title}

Date & Time: ${event.date.toLocaleDateString()} at ${event.time} GMT+1

${!event.isVirtual ? `Location: ${event.location}` : 'The event link will be sent to you in a separate email 30 minutes before the event starts.'}

We look forward to seeing you!

Best regards,
EDM Team`)

We look forward to your meaningful participation.

Best regards,
EDM Events Team`);
        } else if (type === '30m') {
          console.log(`Event Reminder: ${event.title}
Hello ${user.name},

This is a reminder that your event starts in 30 minutes.

Event: ${event.title}

Date & Time: ${event.date.toLocaleDateString()} at ${event.time} GMT+1

${!event.isVirtual ? `Location: ${event.location}` : `Online Link: ${event.onlineLink}`}

We look forward to seeing you!

Best regards,
EDM Team`)

We look forward to welcoming you ${event.isVirtual ? 'online' : 'in person'}!

Best regards,
EDM Events Team`);
        }
        console.log(`✓ Created ${type} reminder in database with appropriate message template`);
      } else {
        console.log(`✗ Cannot create reminder - scheduled time would be ${Math.round((currentTime.getTime() - scheduledFor.getTime()) / (60 * 1000))} minutes in the past`);
      }
    };

    console.log('\nCreating reminders...');

    // For 30-minute event, create just the 30m reminder
    await createReminder('30m', shortEvent, user, 30);

    // For 24-hour event, create 24h, 1h and 30m reminders
    await createReminder('24h', longEvent, user, 24 * 60);
    await createReminder('1h', longEvent, user, 60);
    await createReminder('30m', longEvent, user, 30);

    // Verify reminders were created
    const reminders = await prisma.eventReminder.findMany({
      where: {
        OR: [
          { eventId: shortEvent.id },
          { eventId: longEvent.id }
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
      console.log(`  Scheduled for: ${reminder.scheduledFor.toLocaleString()}`);
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
