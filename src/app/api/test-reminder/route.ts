import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { EventReminderService } from '@/lib/services/event-reminder.service';

// This endpoint is for testing only
export async function POST(request: Request) {
  try {
    // Create a test event (scheduled for tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0); // Set to 2 PM tomorrow

    const event = await prisma.event.create({
      data: {
        title: "Test Event for Alpha",
        description: "This is a test event to verify reminder functionality",
        date: tomorrow,
        time: "14:00",
        location: "Virtual Meeting Room",
        isVirtual: true,
        onlineLink: "https://meet.google.com/test-meeting-room"
      }
    });

    console.log('Created test event:', event);

    // Create or get the user
    const user = await prisma.user.upsert({
      where: { email: "alphadumbuya7@gmail.com" },
      update: {},
      create: {
        email: "alphadumbuya7@gmail.com",
        name: "Alpha Dumbuya",
        hashedPassword: "test-password-hash",
        role: "USER"
      }
    });

    // Create an immediate reminder for testing
    const now = new Date();
    await prisma.eventReminder.create({
      data: {
        eventId: event.id,
        userId: user.id,
        type: "test",
        scheduledFor: now,
        status: "PENDING"
      }
    });
    
    console.log('Test reminder created');

    // Process reminders immediately
    console.log('Processing reminders...');
    await EventReminderService.processReminders();
    console.log('Reminders processed');

    // Get the created reminders
    const reminders = await prisma.eventReminder.findMany({
      where: {
        eventId: event.id,
      },
      orderBy: {
        scheduledFor: 'asc'
      }
    });

    // Process reminders immediately for testing
    await EventReminderService.processReminders();

    return NextResponse.json({
      message: 'Test event and reminders created successfully',
      event,
      reminders: reminders.map(r => ({
        ...r,
        scheduledFor: r.scheduledFor.toISOString()
      }))
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json({ 
      error: 'Failed to run test',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
