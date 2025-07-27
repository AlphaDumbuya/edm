// Professional event registration confirmation email template for EDM events

interface Event {
  title: string;
  date: string;
  time?: string;
  timezone: string;
  location: string;
  description: string;
  isVirtual?: boolean;
  onlineLink?: string | null;
}

export function eventRegistrationConfirmationEmail({
  name,
  email,
  event
}: {
  name: string;
  email: string;
  event: Event;
}) {
  return {
    subject: `Registration Confirmed: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto;">
        <h2 style="color: #2563eb;">Thank you for registering, ${name}!</h2>
        <p>Your registration for the following event has been received:</p>
        <table style="margin: 20px 0; border-collapse: collapse;">
          <tr><td style="font-weight: bold; padding: 4px 8px;">Event:</td><td style="padding: 4px 8px;">${event.title}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px 8px;">Date:</td><td style="padding: 4px 8px;">${new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
          <tr><td style="font-weight: bold; padding: 4px 8px;">Time:</td><td style="padding: 4px 8px;">${event.time} (${event.timezone})</td></tr>
          <tr><td style="font-weight: bold; padding: 4px 8px;">Location:</td><td style="padding: 4px 8px;">${event.isVirtual ? 'Virtual Event' : event.location}</td></tr>
        </table>
        ${event.isVirtual ? `
        <div style="margin: 20px 0; padding: 12px; border-radius: 6px; background-color: #f0f9ff; border: 1px solid #e0f2fe;">
          <p style="margin: 0; color: #0369a1;">📱 This is a virtual event. You will receive the join link in your reminder email.</p>
        </div>` : ''}
        <div style="margin-bottom: 20px;">
          <strong>Event Details:</strong>
          <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 6px;">
            ${event.description}
          </div>
        </div>
        <p>We look forward to seeing you there! If you have any questions, reply to this email or contact our team.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 13px; color: #666;">EDM Events Team<br/>Evangelism Discipleship Mission</p>
      </div>
    `,
    text: `Thank you for registering, ${name}!

Your registration for the following event has been received:

Event: ${event.title}
Date: ${new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${event.time} (${event.timezone})
Location: ${event.isVirtual ? 'Virtual Event' : event.location}
${event.isVirtual ? '\nThis is a virtual event. You will receive the join link in your reminder email.\n' : ''}

Event Details:
${event.description.replace(/<[^>]+>/g, '')}

We look forward to seeing you there! If you have any questions, reply to this email or contact our team.

EDM Events Team\nEvangelism Discipleship Mission`
  };
}
