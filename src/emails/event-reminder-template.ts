export function getEventReminderEmailHtml({
  name,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  isVirtual,
  onlineLink,
  timeUntilEvent,
}: {
  name: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  isVirtual: boolean;
  onlineLink?: string;
  timeUntilEvent: string;
}) {
  const virtualEventDetails = isVirtual
    ? timeUntilEvent === '30 minutes'
      ? `
        <p style="margin: 16px 0;">This is a virtual event. Here's your link to join:</p>
        <p style="margin: 16px 0;"><a href="${onlineLink}" style="color: #007bff; text-decoration: none;">${onlineLink}</a></p>
        <p style="margin: 16px 0;">Please click the link above at the scheduled time to join the event.</p>
      `
      : timeUntilEvent === '1 hour'
      ? `
        <p style="margin: 16px 0;">This is a virtual event. You will receive the join link in your next reminder email (30 minutes before the event starts).</p>
      `
      : `
        <p style="margin: 16px 0;">This is a virtual event. The join link will be sent in a reminder email 30 minutes before the event starts.</p>
      `
    : '';

  const locationDetails = isVirtual
    ? 'This is a virtual event'
    : `Location: ${eventLocation}`;

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; margin-bottom: 20px;">Event Reminder: ${eventTitle}</h2>
      <p style="margin: 16px 0;">Hello ${name},</p>
      <p style="margin: 16px 0;">This is a reminder that you are registered for the following event that starts in ${timeUntilEvent}:</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Event:</strong> ${eventTitle}</p>
        <p style="margin: 8px 0;"><strong>Date:</strong> ${eventDate}</p>
        <p style="margin: 8px 0;"><strong>Time:</strong> ${eventTime}</p>
        <p style="margin: 8px 0;"><strong>Location:</strong> ${locationDetails}</p>
      </div>

      ${virtualEventDetails}

      <p style="margin: 16px 0;">We look forward to your participation!</p>
      
      <p style="margin: 16px 0;">Best regards,<br>EDM Team</p>
    </div>
  `;
}

export function getEventReminderEmailText({
  name,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  isVirtual,
  onlineLink,
  timeUntilEvent,
}: {
  name: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  isVirtual: boolean;
  onlineLink?: string;
  timeUntilEvent: string;
}) {
  const virtualEventDetails = isVirtual
    ? timeUntilEvent === '30 minutes'
      ? `\nThis is a virtual event. Here's your link to join:\n${onlineLink}\n\nPlease click the link above at the scheduled time to join the event.`
      : timeUntilEvent === '1 hour'
      ? '\nThis is a virtual event. You will receive the join link in your next reminder email (30 minutes before the event starts).'
      : '\nThis is a virtual event. The join link will be sent in a reminder email 30 minutes before the event starts.'
    : '';

  const locationDetails = isVirtual
    ? 'This is a virtual event'
    : `Location: ${eventLocation}`;

  return `
Event Reminder: ${eventTitle}

Hello ${name},

This is a reminder that you are registered for the following event that starts in ${timeUntilEvent}:

Event: ${eventTitle}
Date: ${eventDate}
Time: ${eventTime}
Location: ${locationDetails}

${virtualEventDetails}

We look forward to your participation!

Best regards,
EDM Team
  `.trim();
}
