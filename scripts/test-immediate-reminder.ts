import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../src/lib/email/sendEmail';

const prisma = new PrismaClient();

async function testReminder() {
  try {
    // Create a test event for right now
    const now = new Date();
    const event = await prisma.event.create({
      data: {
        title: "Immediate Test Event",
        description: "This is a test event for immediate reminder",
        date: new Date(now.getTime() + 30 * 60000), // 30 minutes from now
        time: now.toTimeString().split(' ')[0],
        location: "Virtual Meeting Room",
        isVirtual: true,
        onlineLink: "https://meet.google.com/test-meeting-room"
      }
    });

    console.log('Created test event:', event);

    // Create reminder
    const reminder = await prisma.eventReminder.create({
      data: {
        eventId: event.id,
        userId: "b39ff5cc-f159-46a3-b78f-10fac4618e5c", // Your user ID from previous test
        type: "immediate",
        scheduledFor: now,
        status: "PENDING"
      }
    });

    console.log('Created reminder:', reminder);

    // Send test email
    await sendEmail({
      to: "alphadumbuya7@gmail.com",
      subject: "Test Event Reminder",
      html: `
        <h1>Test Event Reminder</h1>
        <p>This is a test reminder for the event: ${event.title}</p>
        <p>Time: ${event.time}</p>
        <p>Location: ${event.location}</p>
        ${event.isVirtual ? `<p>Join link: ${event.onlineLink}</p>` : ''}
      `,
      text: `Test Event Reminder\n\nEvent: ${event.title}\nTime: ${event.time}\nLocation: ${event.location}`
    });

    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testReminder();
