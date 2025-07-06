// EDM Event Registration Confirmation Email Template
// Usage: import and call eventRegistrationConfirmationEmail({ name, email, event })

export function eventRegistrationConfirmationEmail({
  name,
  email,
  event
}: {
  name: string;
  email: string;
  event: {
    title: string;
    date: string;
    time?: string;
    location: string;
    description: string;
    imageUrl?: string;
  };
}) {
  const formattedDate = new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return {
    subject: `Registration Confirmed: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto; background: #f8fafc; border-radius: 10px; box-shadow: 0 2px 8px #e5e7eb; padding: 32px 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://edm-sl.org/logo.png" alt="EDM Logo" style="height: 48px; margin-bottom: 8px;" />
          <h2 style="color: #2563eb; margin: 0;">Thank you for registering, <span style="color: #111">${name}</span>!</h2>
          <p style="margin: 8px 0 0 0; font-size: 16px;">Your spot for <strong>${event.title}</strong> is confirmed.</p>
        </div>
        <table style="width: 100%; margin: 24px 0; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden;">
          <tr><td style="font-weight: bold; padding: 8px 12px; background: #f1f5f9;">Event</td><td style="padding: 8px 12px;">${event.title}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px 12px; background: #f1f5f9;">Date & Time</td><td style="padding: 8px 12px;">${formattedDate}${event.time ? ' at ' + event.time : ''}</td></tr>
          <tr><td style="font-weight: bold; padding: 8px 12px; background: #f1f5f9;">Location</td><td style="padding: 8px 12px;">${event.location}</td></tr>
        </table>
        ${event.imageUrl ? `<div style="text-align:center;margin-bottom:20px;"><img src="${event.imageUrl}" alt="Event image" style="max-width:100%;border-radius:8px;box-shadow:0 1px 4px #e5e7eb;" /></div>` : ''}
        <div style="margin-bottom: 24px;">
          <h3 style="margin: 0 0 8px 0; color: #2563eb; font-size: 18px;">Event Details</h3>
          <div style="background: #f1f5f9; padding: 16px; border-radius: 6px; font-size: 15px; line-height: 1.6;">${event.description}</div>
        </div>
        <div style="margin-bottom: 24px;">
          <p style="margin: 0; font-size: 15px;">If you have any questions, reply to this email or contact our team at <a href="mailto:info@edm-sl.org" style="color: #2563eb; text-decoration: underline;">info@edm-sl.org</a>.</p>
        </div>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <div style="font-size: 13px; color: #666; text-align: center;">
          EDM Events Team<br/>Empowering Dreams Ministries<br/>
          <a href="https://edm-sl.org" style="color: #2563eb; text-decoration: none;">edm-sl.org</a>
        </div>
      </div>
    `,
    text: `Thank you for registering, ${name}!
Your spot for ${event.title} is confirmed.

Event: ${event.title}
Date & Time: ${formattedDate}${event.time ? ' at ' + event.time : ''}
Location: ${event.location}

Event Details:
${event.description.replace(/<[^>]+>/g, '')}

If you have any questions, reply to this email or contact our team at info@edm-sl.org.

EDM Events Team
Empowering Dreams Ministries
edm-sl.org`
  };
}
